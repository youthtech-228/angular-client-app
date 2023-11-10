import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
   canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// if there are no pending changes, just allow deactivation; else confirm first
     return component.canDeactivate() ||
        // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
        // when navigating away from your angular app, the browser will show a generic warning message
        // see http://stackoverflow.com/a/42207299/7307355
        confirm('You have not saved your changes. Select Cancel to go back and save these changes, or OK to lose these changes.');
  }
}
