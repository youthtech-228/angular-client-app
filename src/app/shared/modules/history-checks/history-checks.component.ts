import {Component, OnInit} from '@angular/core';
import {RemoveEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {DataService} from '../../services/data.service';
import { environment } from '../../../../environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import {AuditService} from '../../services/audit.service';
import {pullAllBy} from 'lodash-es';

@Component({
   selector: 'app-history-checks',
   templateUrl: './history-checks.component.html',
   styleUrls: ['./history-checks.component.scss']
})
export class HistoryChecksComponent implements OnInit {
   public instructions = `
      For a complete overview of this requirement we encourage the review of 49 CFR Part 40.25<br><br>

As an employer you must, after obtaining the employee’s written consent, request information from all DOT-regulated employers who have employed the individual during any period during the two years before the date of the employee’s application or transfer.<br><br>

Information you must request from the previous employers are:<br><br>

<ul>
                    <li>Alcohol tests with a result of 0.04 or higher alcohol concentration</li>
                    <li>Verified positive drug tests</li>
                    <li>Refusals to be tested (including verified adulterated or substituted drug test results)</li>
                    <li>Other violations of DOT agency drug and alcohol testing regulations</li>
                    <li>With respect to any employee who violated a DOT drug and alcohol regulation, documentation of the employee’s successful completion of DOT return-to-duty requirements (including follow-up tests).  If the previous employer does not have information about the return-to-duty process (e.g., an employer who did not hire an employee who tested positive on a pre-employment test), you must seek to obtain this information from the employee.</li>
                </ul>
You must obtain and review the information before the employee first performs safety-sensitive functions. If this is not feasible, you must obtain and review the information as soon as possible. However, you must not permit the employee to perform safety-sensitive functions after 30 days from the date on which the employee first performed safety-sensitive functions, unless you have obtained or made and documented a good faith effort to obtain this information.<br><br>

If you obtain information that the employee has violated a DOT agency drug and alcohol regulation, you must not use the employee to perform safety-sensitive functions unless you also obtain information that the employee has subsequently complied with the DOT return-to-duty requirements.<br><br>

As an employer, you must ask the employee whether he or she has tested positive, or refused to test, on any pre-employment drug or alcohol test administered by an employer to which the employee applied for, but did not obtain, safety-sensitive transportation work covered by DOT agency drug and alcohol testing rules during the past two years. If the employee admits that he or she had a positive test or a refusal to test, you must not use the employee to perform safety-sensitive functions for you, until and unless the employee documents successful completion of the return-to-duty process.<br><br>

Upload an example of the History Check form your company will be utilizing to check on the drug and alcohol testing record of employees it is intending to use to perform safety-sensitive duties.<br><br>

If you don’t currently have a History Check form you have the option of utilizing the model form we have provided. Click here to download the model form. Personalize the form with your company information and upload below.
`;
   public uploadSaveUrl: any = environment.BASE_URL + '/File';
   public uploadRemoveUrl: any;
   public uploadedFiles: any;
   public countFiles: any;
   module = 'history-checks';
   pageForm: FormGroup;
   messageForm: FormArray;
   ncms_id: string;
   isLoading = true;
   isSaving = false;
   alertMessage={ show: true, class: "danger" }
   messages = [
      {
         title: 'DBA Name',
         text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
         author: 'Michael Wasson (NCMS)',
         date: '11/9/2020 4:27PM',
         pass: false,
      },
      {
         title: '',
         text: 'This message is created using the button above and may or may not be tied to a particular input.',
         author: 'Michael Wasson (NCMS)',
         date: '11/12/2020 4:27PM',
         pass: true,
      },
   ];
   constructor(  
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private dataService: DataService,
      public auditService: AuditService ){
         this.uploadRemoveUrl = environment.BASE_URL + `json/reply/DeleteFile`;
      }

   async ngOnInit() {
      this.isLoading = true;
      this.pageForm = this.formBuilder.group([])
      this.messageForm = this.formBuilder.array([]);
      //get ncms_id
      await this.authService.fetchUser();
      this.ncms_id = this.authService.getNcmsId();
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module);
      this.fetchUploadedFiles()
      this.isLoading = false;
   }

   public fetchUploadedFiles() {
      const res = this.dataService.getFiles("PS_HISTORY_CHECK_FORM").then(res => 
         {
            const results = res['results'];
            const data = [];
            results.forEach((file, key) => {
               data.push({
                  name: file.path.split('_')[1],
                  id: file.id
               });
            });
            this.uploadedFiles = data;
            this.countFiles = data.length;
            
            this.updateComplete()
         }
      );
   }
   public updateComplete(){
      this.alertMessage.class = this.uploadedFiles.length > 0 ? "success" : "danger"
   }
   public onFileUpload(e) {
      const name = e.files[0].name;
      e.data = { type: "PS_HISTORY_CHECK_FORM", ncms_id:"23", name: name}
   }
  
   public onFileRemove(e: RemoveEvent) {
      // @ts-ignore
      const id = e.files[0].id;

      if (id) {
         e.data = {id};
      }
      this.updateComplete()
   }
   public completeEventHandler(e) {
      this.fetchUploadedFiles();
   }
   public successEventHandler(event: SuccessEvent) {
      if (event.operation === 'upload') {
         this.uploadedFiles.push(event.response.body);
      } else if (event.operation === 'remove') {
         pullAllBy(this.uploadedFiles, event.files, 'id');
      }
   }

   public onFileClear() {
      for (const uploadedFile of this.uploadedFiles) {
         if (uploadedFile.id) {
            // @ts-ignore
            this.dataService.getClient().delete(new DeleteFile({id: +uploadedFile.id}));
         }
      }
      this.fetchUploadedFiles();
   }
   async onSave()
   {
     if( this.countFiles = 0 ) return false
     this.isSaving = true;
     await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
     await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
     await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
     this.isSaving = false;
   }
}
