import {
   Component, HostListener, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {
   FindRandomProcess, RandomProcess, StoreRandomProcess, UpdateRandomProcess
} from '../../models/dtos';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../../core/auth.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {NotificationStyledService} from '../../services/notification-styled.service';
import {AuditService} from '../../services/audit.service';
import {Observable} from 'rxjs';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {InfoType} from '../../components/button-info/button-info.component';

@Component({
   selector: 'app-random-process',
   templateUrl: './random-process.component.html',
   styleUrls: ['./random-process.component.scss']
})
export class RandomProcessComponent implements OnInit {
   module = 'random-process';
   ncms_id: string;
   eInfoType = InfoType;

   @ViewChild('saveTemplate', {read: TemplateRef}) saveTemplate: TemplateRef<any>;
   @ViewChild('sendTemplate', {read: TemplateRef}) sendTemplate: TemplateRef<any>;
   @ViewChild('template', {read: TemplateRef}) successTemplate: TemplateRef<any>;
   @ViewChild('errorTemplate', {read: TemplateRef}) errorTemplate: TemplateRef<any>;

   instructions = `
   Please complete the following information regarding your company's random drug and alcohol selection process. If your company uses a third party administrator to manage your random program, you may need to contact them for help in completing this section. For the current list of the DOT Random Testing Rates click <a target="_blank" href='https://www.transportation.gov/odapc/random-testing-rates'>here</a>.
   `;

   randomProcess: RandomProcess;
   allForm: FormGroup = new FormGroup({});
   inputForm: FormGroup;
   auditAllForm: FormArray;
   errorMessage: any;
   isSaving: any;
   isLoading: boolean;
   error: any;

   private status: AuditStatus;
   private isNotificationSent: any;

   /**
    * Can the component be deactivated. The component can be deactivated if the form is unchanged.
    */
   canDeactivate(): Observable<boolean> | boolean {
      this.dataService.setShouldValidate(false);
      return !this.inputForm.dirty || this.auditAllForm.dirty;
   }

   // @HostListener allows us to also guard against browser refresh, close, etc.
   @HostListener('window:beforeunload', ['$event'])
   unloadNotification($event: any) {
      if (!this.canDeactivate()) {
         $event.returnValue =
            'You have not saved your changes. Select Cancel to go back and save these changes, or OK to lose these changes.';
      }
   }

   constructor(private dataService: DataService, public authService: AuthService, private formBuilder: FormBuilder,
      private notificationStyledService: NotificationStyledService, public auditService: AuditService) {

      this.ncms_id = this.authService.getNcmsId();
   }

   async ngOnInit(): Promise<void> {
      try {

         const client = this.dataService.getClient();
         this.isLoading = true;

         await this.authService.fetchUser();
         const result = await client.get(new FindRandomProcess(), {ncms_id: this.authService.getNcmsId()});
         this.randomProcess = result?.results && result.results?.[result.results.length - 1];

         this.inputForm = this.formBuilder.group({
            id: [this.randomProcess?.id],
            ncms_id: [this.randomProcess?.ncms_id],
            // phmsa: [this.randomProcess?.phmsa],
            // fmcsa: [this.randomProcess?.fmcsa],
            // fra: [this.randomProcess?.fra],
            consortium_pool: [this.randomProcess?.consortium_pool],
            tpa_phmsa: [this.randomProcess?.tpa_phmsa],
            tpa_fmcsa: [this.randomProcess?.tpa_fmcsa],
            tpa_fra: [this.randomProcess?.tpa_fra],
            tpa_faa: [this.randomProcess?.tpa_faa],
            tpa_uscg: [this.randomProcess?.tpa_uscg],
            alternate_draws_explanation: [this.randomProcess?.alternate_draws_explanation],
            selection_frequency: [this.randomProcess?.selection_frequency],
            alternate_draws: [this.randomProcess?.alternate_draws],
            random_draw_documentation: [this.randomProcess?.random_draw_documentation],
            random_draws_explanation: [this.randomProcess?.random_draws_explanation],
            generator: [this.randomProcess?.generator],
            generator_explanation: [this.randomProcess?.generator_explanation],
         });

         this.auditAllForm = this.formBuilder.array([]);
         this.allForm.addControl('inputForm', this.inputForm);
         this.allForm.addControl('auditAllForm', this.auditAllForm);

         await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
         await this.auditService.loadPendingMessages(this.ncms_id, this.module);
         this.isNotificationSent = !this.authService.isAuditor() || this.auditService.isNotificationSent(this.module);

         this.inputForm.valueChanges.subscribe(() => {
            // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
            if (this.authService.isAuditor() && this.isNotificationSent) {
               this.isNotificationSent = this.auditService.isNotificationSent(this.module);
            }

            this.dataService.saveSendNotification(this.allForm, this.saveTemplate, this.sendTemplate, this.isNotificationSent);
         });
         this.auditAllForm.valueChanges.subscribe(() => {
            // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
            if (this.authService.isAuditor() && this.isNotificationSent) {
               this.isNotificationSent = this.auditService.isNotificationSent(this.module);
            }

            this.dataService.saveSendNotification(this.allForm, this.saveTemplate, this.sendTemplate,
               this.isNotificationSent);
         });
         // this.allForm.statusChanges.subscribe(text => {
         //    debugger;
         // });
         this.allForm.valueChanges.subscribe(() => {
            // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
            if (this.authService.isAuditor() && this.isNotificationSent) {
               this.isNotificationSent = this.auditService.isNotificationSent(this.module);
            }

            this.dataService.saveSendNotification(this.allForm, this.saveTemplate, this.sendTemplate,
               this.isNotificationSent);
            const auditStatus = this.auditService.getAuditStatus(this.auditAllForm);
            if (this.status !== auditStatus) {
               this.status = auditStatus;
            }
         });

         this.isLoading = false;
      } catch (e) {
         this.error = e.responseStatus.errorCode + ': ' + e.responseStatus.message;
         this.errorMessage = 'Could not load the company information.';
         console.log(e);
         this.notificationStyledService.showError({content: this.errorTemplate});
      }
   }

   public async save() {

      if (this.allForm.invalid) {
         this.dataService.setShouldValidate(true);
         this.notificationStyledService.showError({content: 'Required fields are not set.'});
         return;
      }

      try {
         this.isSaving = true;

         if (this.allForm?.dirty) {
            if (this.inputForm?.dirty) {
               let result;

               if (this.inputForm.value?.id) {
                  result = await this.dataService.getClient().put(new UpdateRandomProcess(this.inputForm.value));
               } else {
                  result = await this.dataService.getClient().post(new StoreRandomProcess(this.inputForm.value));
               }
               this.inputForm.reset(result);
               this.inputForm.markAsPristine();
            }
            await this.dataService.updateAuditMessages(this.auditAllForm);
            this.auditAllForm.markAsPristine();

            await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
            await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
            this.allForm.markAsPristine();
         }

         this.notificationStyledService.showSuccess({content: this.successTemplate});
         this.dataService.clearSaveNotification(this.sendTemplate, this.isNotificationSent);
         this.dataService.setShouldValidate(false);
         this.isSaving = false;
      } catch (e) {
         this.dataService.setShouldValidate(false);
         this.isSaving = false;
         console.log(e);
         this.error = e.message || e.toString();
         this.errorMessage = 'Could not save the Random Process information.';
         this.notificationStyledService.showError({content: this.errorTemplate});
      }
   }
}
