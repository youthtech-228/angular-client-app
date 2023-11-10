import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {DataService} from '../shared/services/data.service';
import {GetUser, User} from '../shared/models/dtos';
import {NotificationStyledService} from '../shared/services/notification-styled.service';

@Injectable({providedIn: 'root'})
export class AuthService {

   private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
   public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

   private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
   public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

   private user: User;
   private ncms_id: string;

   /**
    * Publishes `true` if and only if (a) all the asynchronous initial
    * login calls have completed or errored, and (b) the user ended up
    * being authenticated.
    *
    * In essence, it combines:
    *
    * - the latest known state of whether the user is authorized
    * - whether the ajax calls for initial log in have all been done
    */
   public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
      this.isAuthenticated$,
      this.isDoneLoading$
   ]).pipe(map(values => values.every(b => b)));

   private navigateToLoginPage() {
      this.router.navigateByUrl('/');
   }

   constructor(private oauthService: OAuthService, private router: Router, private dataService: DataService,
      private notificationStyledService: NotificationStyledService, ) {
      if (!environment.production) {
         // Useful for debugging:
         this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
               console.error('OAuthErrorEvent Object:', event);
            } else {
               console.warn('OAuthEvent Object:', event);
               if (event?.type === 'token_received') {
                  this.dataService.updateBearerToken(this.oauthService.getAccessToken());
               }
            }
         });
      }
      // This is tricky, as it might cause race conditions (where access_token is set in another
      // tab before everything is said and done there.
      // TODO: Improve this setup. See:
      // https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/2
      window.addEventListener('storage', (event) => {
         // The `key` is `null` if the event was caused by `.clear()`
         if (event.key !== 'access_token' && event.key !== null) {
            return;
         }

         const isTokenValid = this.oauthService.hasValidAccessToken();
         this.isAuthenticatedSubject$.next(isTokenValid);

         if (!isTokenValid) {
            this.navigateToLoginPage();
         }
      });

      this.oauthService.events
         .subscribe(_ => {
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
         });

      this.oauthService.events
         .pipe(filter(e => ['logout', 'session_terminated', 'session_error'].includes(e.type)))
         .subscribe(() => this.navigateToLoginPage());

      this.oauthService.setupAutomaticSilentRefresh();
   }

   async fetchUser(): Promise<User> {

      if (!this.user) {
         console.log('fetch User', (new Date()).toLocaleTimeString());
         try {
            this.user = await this.dataService.getClient().get(new GetUser());
            this.ncms_id = this.user?.ncms_id;
         } catch (error) {
            console.log('Error fetching user', error);
         }
      }
      return this.user;
   }

   public runInitialLoginSequence(): Promise<void> {
      if (location.hash) {
         console.log('Encountered hash fragment, plotting as table...');
         console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
      }

      return this.oauthService.tryLogin().then(async () => {
         if (this.oauthService.hasValidAccessToken()) {
            return Promise.resolve();
         }
      }).then(async () => {
         try {
            this.isDoneLoadingSubject$.next(true);
         } catch (error) {
            console.log(error);
            this.notificationStyledService.showError({content: 'Could not get User from the server.'});
         }

         // Check for the strings 'undefined' and 'null' just to be sure. Our current
         // login(...) should never have this, but in case someone ever calls
         // initImplicitFlow(undefined | null) this could happen.
         if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
            let stateUrl = this.oauthService.state;
            if (stateUrl.startsWith('/') === false) {
               stateUrl = decodeURIComponent(stateUrl);
            }
            this.router.navigateByUrl(stateUrl);
         }
      }).catch(() => this.isDoneLoadingSubject$.next(true));
   }

   public login(targetUrl?: string) {
      this.oauthService.initImplicitFlow(targetUrl || this.router.url);
   }

   public logout() {
      console.log('logout.');
      this.oauthService.revokeTokenAndLogout();
      this.oauthService.logOut();
   }

   public refresh() {
      this.oauthService.silentRefresh();
   }

   public hasValidToken() {
      return this.oauthService.hasValidAccessToken();
   }

   public getUser(): User {
      return this.user;
   }

   /**
    * Get the current ncms_id.
    */
   public getNcmsId(): string | undefined {
      if (this.ncms_id === undefined) {
         console.log('Call fetchUser before calling getNcmsId');
         this.ncms_id = localStorage.ncms_id;
      }
      if (this.ncms_id === '0' && localStorage.ncms_id) {
         this.ncms_id = localStorage.ncms_id;
      }

      return this.ncms_id;
   }

   // TODO this needs to be changed when admin operating on a different ncms_id than the user.
   /**
    * Set the ncms_id to be used.
    *
    * @param ncms_id The new ncms_id
    */
   public setNcmsId(ncms_id: string): void {
      this.ncms_id = ncms_id;
      localStorage.ncms_id = ncms_id;
   }

   /**
    * Reset the ncms_id to the user's ncms_id.
    */
   public resetNcmsId(): void {
      this.ncms_id = this.user?.ncms_id;
   }

   public isAuditor() {
      return this.user?.isAdmin === true;
   }

   public isContractor() {
      return !this.user?.isAdmin;
   }
}
