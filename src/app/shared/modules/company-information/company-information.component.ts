import {
   ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
   AuditMessage, Company, FindCompanies, UpdateCompany
} from '../../models/dtos';
import {AuditService} from '../../services/audit.service';
import {JsonClientService} from '../../services/json-client.service';
import {ContactsComponent} from './contacts/contacts.component';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {NotificationStyledService} from '../../services/notification-styled.service';
import {RequirementsComponent} from './requirements/requirements.component';
import {ThirdPartyComponent} from './third-party/third-party.component';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../../services/pending-changes.guard';
import {AuthService} from '../../../core/auth.service';
import {InternalCommentsComponent} from './internal-comments/internal-comments.component';

@Component({
   selector: 'app-company-information',
   templateUrl: './company-information.component.html',
   styleUrls: ['./company-information.component.scss'],
})
export class CompanyInformationComponent implements OnInit, ComponentCanDeactivate {
   module = 'company-information';
   eAuditStatus = AuditStatus;
   public company: Company;
   public auditMessages: AuditMessage[] | undefined;

   ncms_id: string;
   public companyAllForm: FormGroup = new FormGroup({});
   public isSaving = false;
   @ViewChild('saveTemplate', {read: TemplateRef}) saveTemplate: TemplateRef<any>;
   @ViewChild('sendTemplate', {read: TemplateRef}) sendTemplate: TemplateRef<any>;
   @ViewChild('template', {read: TemplateRef}) successTemplate: TemplateRef<any>;
   @ViewChild('errorTemplate', {read: TemplateRef}) errorTemplate: TemplateRef<any>;

   @ViewChild('contactsElement') contactsComponent: ContactsComponent;
   @ViewChild('requirementsElement') requirementsComponent: RequirementsComponent;
   @ViewChild('thirdPartyElement') thirdPartyComponent: ThirdPartyComponent;
   @ViewChild('internalCommentsElement') internalCommentsComponent: InternalCommentsComponent;

   error: any;
   public errorMessage: any;
   isLoading = true;
   status: AuditStatus;
   private isNotificationSent: any;

   /**
    * Can the component be deactivated. The component can be deactivated if the form is unchanged.
    */
   canDeactivate(): Observable<boolean> | boolean {
      this.dataService.setShouldValidate(false);
      return !this.companyAllForm.dirty;
   }

   // @HostListener allows us to also guard against browser refresh, close, etc.
   @HostListener('window:beforeunload', ['$event'])
   unloadNotification($event: any) {
      if (!this.canDeactivate()) {
         $event.returnValue = 'You have not saved your changes. Select Cancel to go back and save these changes, or OK to lose these changes.';
      }
   }

   constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient,
      private dataService: DataService, private formBuilder: FormBuilder, private jsonService: JsonClientService,
      private notificationStyledService: NotificationStyledService, public auditService: AuditService,
      private authService: AuthService, private el: ElementRef,
   ) {
      this.ncms_id = this.authService.getNcmsId();
   }

   async ngOnInit() {
      try {
         const client = this.dataService.getClient();
         this.isLoading = true;
         await this.authService.fetchUser();
         this.ncms_id = this.authService.getNcmsId();

         if (this.ncms_id === '0' && localStorage.ncms_id) {
            this.ncms_id = localStorage.ncms_id;
         }

         const result = await client.get(new FindCompanies(), {ncms_id: this.ncms_id});
         this.company = result?.results?.[0];

         await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
         await this.auditService.loadPendingMessages(this.ncms_id, this.module);
         this.isNotificationSent = !this.authService.isAuditor() || this.auditService.isNotificationSent(this.module);
         this.isLoading = false;
      } catch (e) {
         this.error = e.responseStatus.errorCode + ': ' + e.responseStatus.message;
         this.errorMessage = 'Could not load the company information.';
         console.log(e);
         this.notificationStyledService.showError({content: this.errorTemplate});
      }
      this.companyAllForm.valueChanges.subscribe(() => {
         // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
         if (this.authService.isAuditor() && this.isNotificationSent) {
            this.isNotificationSent = this.auditService.isNotificationSent(this.module);
         }

         this.dataService.saveSendNotification(this.companyAllForm, this.saveTemplate, this.sendTemplate,
            this.isNotificationSent);

         const auditStatus = this.getAuditStatus();

         if (this.status !== auditStatus) {
            this.status = auditStatus;
            this.changeDetector.detectChanges();
         }
      });
   }

   scrollToError(): void {
      const firstElementWithError = this.el.nativeElement.querySelector('form .ng-invalid');

      if (firstElementWithError) {
         firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   }

   public async save() {
      if (this.companyAllForm.invalid || !this.contactsComponent.isValid()) {
         this.dataService.setShouldValidate(true);
         this.notificationStyledService.showError({content: 'Required fields are not set.'});
         this.scrollToError();
         return;
      }

      try {
         this.isSaving = true;

         if (this.companyAllForm?.dirty && (this.companyAllForm.get('companyForm').dirty ||
               this.companyAllForm.get('companyExtraForm').dirty ||
               // this.companyAllForm.get('companyRequirementsForm').dirty ||
               this.companyAllForm.get('thirdPartyForm').dirty)) {
            const companyAllForm = this.companyAllForm.value;

            await this.dataService.getClient().put(new UpdateCompany({
               ncms_id: this.company.ncms_id,
               ...companyAllForm.companyForm,
               ...companyAllForm.companyExtraForm,
               ...companyAllForm.companyRequirementsForm,
               ...companyAllForm.thirdPartyForm
            }));
         }
         await this.contactsComponent.save();
         await this.thirdPartyComponent.save();
         if (this.authService.isAuditor()) {
            await this.internalCommentsComponent.save();
         }
         await this.dataService.updateAuditMessages(<FormArray>this.companyAllForm.get('auditForm'));

         await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
         await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);

         // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
         if (this.isAuditor() && this.isNotificationSent) {
            this.isNotificationSent = this.auditService.isNotificationSent(this.module);
         }

         this.companyAllForm.markAsPristine();
         this.notificationStyledService.showSuccess({content: this.successTemplate});
         this.dataService.clearSaveNotification(this.sendTemplate, this.isNotificationSent);
         this.dataService.setShouldValidate(false);
         this.isSaving = false;
      } catch (e) {
         this.dataService.setShouldValidate(false);
         this.isSaving = false;
         console.log(e);
         this.error = e.message || e.toString();
         this.errorMessage = 'Could not save the company information.';
         this.notificationStyledService.showError({content: this.errorTemplate});
      }
   }

   public isAuditor() {
      return this.authService.isAuditor();
   }

   public getAuditStatus() {
      const auditForm = <FormArray>this.companyAllForm?.get('auditForm');

      return this.auditService.getAuditStatus(auditForm);
   }

   public send() {
      // TODO how can a notification be sent.
   }
}
