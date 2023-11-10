import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {DataService} from '../../services/data.service'
import {AuthService} from '../../../core/auth.service';
import { environment } from '../../../../environments/environment';
import {AuditService} from '../../services/audit.service';
import {RemoveEvent, SuccessEvent} from '@progress/kendo-angular-upload';
import {pullAllBy} from 'lodash-es';

@Component({
  selector: 'app-testing-forms',
  templateUrl: './testing-forms.component.html',
  styleUrls: ['./testing-forms.component.scss']
})
export class TestingFormsComponent implements OnInit {
   //message part
   ncms_id: string | undefined;
   messageForm: FormArray;
   isLoading = true;
   public isSaving = false;
   module = 'testing-forms'
   public countOfFiles: any;
   public uploadedFiles: any = [];
   public fileType: string = "PS_TESTING";
   public pageForm: FormGroup = new FormGroup({});
   public instructions: any = `
   <p>Provide a blank copy of your company's DOT drug testing form (Federal chain of custody form). This is the form used to document every urine collection required by the DOT drug testing program.</p>
    <p>The form must include:<br>
        </p><ul>
            <li>Employer Name</li>
            <li>Employer Address</li>
            <li>Employer Phone and Fax</li>
            <li>MRO Name</li>
            <li>MRO Address</li>
            <li>MRO Phone and Fax</li>
        </ul>
    <p></p>
`;
   public uploadSaveUrl: any = environment.BASE_URL + '/File';
   public uploadRemoveUrl: any = environment.BASE_URL + `json/reply/DeleteFile`;
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
   public alertMessage: any = { class:"alert-danger"}
   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private dataService: DataService,
      public auditService: AuditService ) {

      this.ncms_id = this.authService.getNcmsId();
   }

   async ngOnInit() {
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
      //this.completeEventHandler()
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
      this.dataService.getFiles( this.fileType ).then(res =>
         {
            const results = res['results'];
            const data = [];
            results.forEach((file, key) => {
              console.log('files',file);
              data.push({
                  name: file.filename,//file.path.split('_')[1],
                  id: file.id,
                  size: file.size,
                  extension: file.extension ?? "txt"
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
      e.data = { type: this.fileType, ncms_id: this.ncms_id, name: name}
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
