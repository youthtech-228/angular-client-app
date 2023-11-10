import {
   Component, HostListener, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
   FindStatisticalData, StatisticalData, StoreStatisticalData, UpdateStatisticalData
} from '../../models/dtos';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {AuditService} from '../../services/audit.service';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {NotificationStyledService} from '../../services/notification-styled.service';

@Component({
   selector: 'app-statistical-data',
   templateUrl: './statistical-data.component.html',
   styleUrls: ['./statistical-data.component.scss']
})
export class StatisticalDataComponent implements OnInit {
   public module = 'statistical-data';
   public messages: any = [];

   @ViewChild('saveTemplate', {read: TemplateRef}) saveTemplate: TemplateRef<any>;
   @ViewChild('sendTemplate', {read: TemplateRef}) sendTemplate: TemplateRef<any>;
   @ViewChild('template', {read: TemplateRef}) successTemplate: TemplateRef<any>;
   @ViewChild('errorTemplate', {read: TemplateRef}) errorTemplate: TemplateRef<any>;

   reportPeriod = [{value: 0, label: '1st Quarter'}, {value: 1, label: '1st and 2nd Quarter'},
      {value: 3, label: '3rd Quarter'}, {value: 2, label: 'Complete Year'}];

   public instruction = `<p>Please supply your company’s required statistical data for the appropriate submission period (based on the below periods):</p>
   <ul>
      <li>1st and 2nd quarters – due July 31</li>
      <li>Complete year – due January 15</li>
   </ul>
   <p>Download the <a id='ContentPlaceHolder1_lbDownloadStatTemplate' href='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$lbDownloadStatTemplate&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))'>Statistical Data Template</a> and complete the requested information for the time period which is due, save the file and use the below upload feature to upload this information to our website.  You will be notified if the upload was successful, if it was not, please address the highlighted areas and re-upload the statistical data form.  If you have a third party administrator that assists with your company testing program, you may need to contact them for assistance with this information.</p>
   <ul>
      <li>Ensure, prior to upload, all company information is completed in the top section of the dataform and all applicable quarters are completed.</li>
      <li>If you have refusals, or positive drug or alcohol results ensure you complete the disposition sections on lines: 208-210, 213-215, 300-302, 305-307.</li>
      <li>If you upload the dataform correctly you will receive a message in green.  If there are issues with the information you entered (or didn’t enter) on the template you will receive an error message in red that must be corrected before you attempt to upload again.</li>
      <li>If your company has multiple pools, that include employees working for our client, be sure to complete a data report for each pool and upload all.</li>
   </ul>
   <p>For the current list of the DOT Random Testing Rates click <a href='https://www.transportation.gov/odapc/random-testing-rates'>here</a>.</p>`;

   public years = [];

   statisticalData: StatisticalData;
   allForm: FormGroup = new FormGroup({});
   inputForm: FormGroup;
   auditAllForm: FormArray;

   public errorMessage: any;
   isSaving: any;
   isLoading = true;
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

   constructor(private notificationStyledService: NotificationStyledService, private dataService: DataService,
      public authService: AuthService, private formBuilder: FormBuilder, public auditService: AuditService) {
   }

   async ngOnInit(): Promise<void> {
      const currentYear = (new Date()).getFullYear();

      for (let year = 2010; year <= currentYear; year++) {
         this.years.push(year);
      }

      try {

         const ncms_id = this.authService.getNcmsId();
         const client = this.dataService.getClient();
         this.isLoading = true;

         await this.authService.fetchUser();
         const result = await client.get(new FindStatisticalData(), {ncms_id: this.authService.getNcmsId()});
         this.statisticalData = result?.results && result.results?.[result.results.length - 1];

         this.inputForm = this.formBuilder.group({
            id: [this.statisticalData?.id],
            ncms_id: [this.statisticalData?.ncms_id || this.authService.getNcmsId()],
            file_id: [this.statisticalData?.file_id],
            test: [],
            report_year: [this.statisticalData?.report_year],
            report_period: [this.statisticalData?.report_period],
         });

         this.auditAllForm = this.formBuilder.array([]);
         this.allForm.addControl('inputForm', this.inputForm);
         this.allForm.addControl('auditAllForm', this.auditAllForm);

         await this.auditService.loadNeedsAttentionMessages(ncms_id, this.module);
         await this.auditService.loadPendingMessages(ncms_id, this.module);
         this.isNotificationSent = !this.authService.isAuditor() || this.auditService.isNotificationSent(this.module);

         this.inputForm.valueChanges.subscribe(() => {
            // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
            if (this.authService.isAuditor() && this.isNotificationSent) {
               this.isNotificationSent = this.auditService.isNotificationSent(this.module);
            }

            this.dataService.saveSendNotification(this.allForm, this.saveTemplate, this.sendTemplate,
               this.isNotificationSent);
         });
         this.auditAllForm.valueChanges.subscribe(() => {
            // Recheck the notification sent. If everything was sent before, see if anything more needs to be sent.
            if (this.authService.isAuditor() && this.isNotificationSent) {
               this.isNotificationSent = this.auditService.isNotificationSent(this.module);
            }

            this.dataService.saveSendNotification(this.allForm, this.saveTemplate, this.sendTemplate,
               this.isNotificationSent);
         });
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
      const ncms_id = this.authService.getNcmsId();

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
                  result = await this.dataService.getClient().put(new UpdateStatisticalData(this.inputForm.value));
               } else {
                  result = await this.dataService.getClient().post(new StoreStatisticalData(this.inputForm.value));
               }
               this.inputForm.reset(result);
               this.inputForm.markAsPristine();
            }
            await this.dataService.updateAuditMessages(this.auditAllForm);
            this.auditAllForm.markAsPristine();

            await this.auditService.loadNeedsAttentionMessages(ncms_id, this.module, true);
            await this.auditService.loadPendingMessages(ncms_id, this.module, true);
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
         this.errorMessage = 'Could not save the Statistical Data information.';
         this.notificationStyledService.showError({content: this.errorTemplate});
      }
   }

   public send() {
      // TODO send the notification to the contractor.
   }
}
