import {Component, OnInit} from '@angular/core';
import {RemoveEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {DataService} from '../../services/data.service';
import { environment } from '../../../../environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import {AuditService} from '../../services/audit.service';
import {pullAllBy} from 'lodash-es';

@Component({
  selector: 'app-medical-review-officer',
  templateUrl: './medical-review-officer.component.html',
  styleUrls: ['./medical-review-officer.component.scss']
})
export class MedicalReviewOfficerComponent implements OnInit {
   module = 'medical-review-officer';
   ncms_id: string;
   messageForm: FormArray;
   isLoading = true;
   isSaving = false;
   alertMessage={ show: true, class: "danger" }
   public pageForm: FormGroup = new FormGroup({});
   public uploadSaveUrl: any = environment.BASE_URL + '/File';
   public uploadRemoveUrl: any;
   public uploadedFiles: any;
   public countOfFiles: any;
   public messages: any = [];
   public instructions: string = `<p>A <strong>Medical Review Officer (MRO)</strong> is a person who is a licensed physician and who is responsible
      for receiving and reviewing laboratory results generated by an employer’s drug testing program and evaluating
      medical explanations for certain drug test results.</p>
      <p>An MRO acts as an independent and impartial “gatekeeper” and is an advocate for the accuracy and integrity of
      the drug testing process. MRO’s provide quality assurance review of the drug testing process for the specimens
      under their review, determine if there is a legitimate medical explanation for laboratory confirmed positive,
      adulterated, substituted and invalid drug test results, ensure the timely flow of test results and other
      information to employers and protect the confidentiality of the drug testing information.</p>
      <p>MRO’s perform an important function in the DOT safety program therefore; it is imperative they fully understand
      the 49 CFR Part 40 regulations.</p>
      <p>Complete the following steps in regards to the process and information utilized by your Medical Review Officer
      (MRO). (Please consult with your MRO before completing this section)</p>`
   constructor(
      private formBuilder: FormBuilder,
      private dataService: DataService,
      private authService: AuthService,
      public auditService: AuditService
   ){
      this.uploadRemoveUrl = environment.BASE_URL + `json/reply/DeleteFile`;
   }

   async ngOnInit() {
      this.isLoading = true;
      this.messageForm = this.formBuilder.array([]);
      //get ncms_id
      const client = this.dataService.getClient();
      await this.authService.fetchUser();
      this.ncms_id = this.authService.getNcmsId();
      if (this.ncms_id === '0' && localStorage.ncms_id) {
         this.ncms_id = localStorage.ncms_id;
      }
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module);
      this.fetchUploadedFiles()
      this.isLoading = false;
   }
   public async save()
   {
      this.isSaving = true;
      await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
      this.isSaving = false;
   }
   public fetchUploadedFiles() {
      this.dataService.getFiles("PS_MEDICAL_REVIEW_OFFICER").then(res => 
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
            this.countOfFiles = data.length;
            this.isLoading = false;
            
            this.updateComplete()
         }
      );
   }
   public updateComplete(){
      this.alertMessage.class = this.uploadedFiles.length > 0 ? "success" : "danger"
   }
   public onFileUpload(e) {
      const name = e.files[0].name;
      e.data = { type: "PS_MEDICAL_REVIEW_OFFICER", ncms_id: this.ncms_id, name: name}
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
}
