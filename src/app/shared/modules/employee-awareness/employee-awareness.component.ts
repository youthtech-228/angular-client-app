import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service'
import {AuthService} from '../../../core/auth.service';
import { environment } from '../../../../environments/environment';
import { FormArray, FormBuilder } from '@angular/forms';
import {AuditService} from '../../services/audit.service';
@Component({
   selector: 'app-employee-awareness',
   templateUrl: './employee-awareness.component.html',
   styleUrls: ['./employee-awareness.component.scss']
})
export class EmployeeAwarenessComponent implements OnInit {
   public isSaving = false;
   public module = 'employee-awareness'
   public instructions: any = `
      <p>The company should provide an employee assistance program (EAP) for its employees and supervisors. The EAP must
         include:
      </p>
      <div id='ctl00_ContentPlaceHolder1_ttEap' style='display:none;position:absolute;'>
         <input id='ctl00_ContentPlaceHolder1_ttEap_ClientState' name='ctl00_ContentPlaceHolder1_ttEap_ClientState'
                type='hidden' autocomplete='off'>
      </div>
      <p></p>
      <ul>
         <li>Education and training on drug use</li>
         <li>Educational materials that explain the alcohol misuse requirements</li>
         <li>Education and distribution of the company’s policies and procedures with respect to meeting the
            requirements for each covered employee prior to the start of a covered job function and for each person
            subsequently hired for or transferred to a covered position.
         </li>
      </ul>`;
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
   ncms_id: string | undefined;
   public uploadSaveUrl: any = environment.BASE_URL + '/File';;
   public uploadRemoveUrl: any;
   public uploadedFiles: any;
   public fileType: string = "PS_EMPAWS";
   public sapContact: any;
   public eapContact: any;
   public tpaContact: any;
   public derContact: any;
   public mroContact: any;
   public hhsContact: any;
   
   //message part
   auditAllForm: FormArray;
   section = 'acknowledgement';
   constructor( 
      private formBuilder: FormBuilder, 
      private authService: AuthService, 
      private dataService: DataService,
      
      public auditService: AuditService, ) {
      
   }
   async ngOnInit() {
      this.auditAllForm = this.formBuilder.array([]);
      await this.authService.fetchUser()
      this.ncms_id = this.authService.getNcmsId();
      
      await this.auditService.loadNeedsAttentionMessages( this.ncms_id, this.module );
      await this.auditService.loadPendingMessages( this.ncms_id, this.module );
      this.completeEventHandler()
   }
   public onFileUpload(e) {
      const name = e.files[0].name;
      e.data = { type: this.fileType, ncms_id: this.ncms_id, name: name}
   }
   public completeEventHandler() {
      const res = this.dataService.getFiles(this.fileType).then(res => {
         const results = res['results'];
         const data = [];
         results.forEach((file, key) => {
           data.push({
             name: file.path.split('_')[1],
             id: file.id
           });
         });
         this.uploadedFiles = data;
       });
   }
   public onDelete(id)
   {

   }
}
