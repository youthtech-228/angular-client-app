import { Component, ElementRef, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service'
import { environment } from '../../../../environments/environment';
import {AuthService} from '../../../core/auth.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuditService} from '../../services/audit.service';
import { Company, FindCompanies } from '../../models/dtos';
@Component({
   selector: 'app-employee-list-validation',
   templateUrl: './employee-list-validation.component.html',
   styleUrls: ['./employee-list-validation.component.scss']
})
export class EmployeeListValidationComponent implements OnInit {

   private domElement: HTMLElement;

   public employees = [];
   public selectedEmployee: any = {};
   public backgroundCheck: any = true;
   public otherDocument: any;
   public thirdOne: any;
   public uploadedFiles: any;
   public selectedValidationId: Number;
   public uploadSaveUrl: any = environment.BASE_URL + '/EmployeeValidationFile';
   public uploadRemoveUrl: any = environment.BASE_URL + `json/reply/DeleteFile`;
   //message part
   ncms_id: string | undefined;
   messageForm: FormArray;
   module = 'employee-list-validation'
   isSaving = false;
   isLoading = true;
   public company: Company;
   public pageForm: FormGroup = new FormGroup({});
   constructor( 
      private formBuilder: FormBuilder, 
      private dataService: DataService, 
      private authService: AuthService, 
      private elementRef: ElementRef,
      public auditService: AuditService) 
   {
      this.domElement = this.elementRef.nativeElement as HTMLElement;
   }

   async ngOnInit(): Promise<void> {
      this.messageForm = this.formBuilder.array([]);//get ncms_id
      const client = this.dataService.getClient();
      await this.authService.fetchUser();
      this.ncms_id = this.authService.getNcmsId();
      if (this.ncms_id === '0' && localStorage.ncms_id) {
         this.ncms_id = localStorage.ncms_id;
      }
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module);
      const result = await client.get(new FindCompanies(), {ncms_id: this.ncms_id});
      this.company = result?.results?.[0];
      //ValidationRequested
      const { results } = await this.dataService.getEmployees( { status: "Incomplete"})
      results.forEach( employee => {
         let firstName = employee.first_name != undefined ? employee.first_name : ""
         let lastName = employee.last_name != undefined ? employee.last_name : ""
         this.employees.push({
            id: employee.id,
            ncms_id: employee.ncms_id,
            first_name: firstName,
            last_name: lastName,
            last4_empid: employee.last4_empid
         })
      })

      if(this.employees.length > 0)
      {
         this.selectedEmployee = this.employees[0]
         this.onSelectEmployee(this.selectedEmployee)
      }
      this.isLoading = false;
   }

   public onSelectEmployee(employee: any) {
      this.selectedEmployee = employee;
      this.dataService.getEmployeeValidationId( {employeeId: employee.id})
      .then(({results}) => {
         this.selectedValidationId = results[0].id
         this.dataService.getEmployeeValidationFiles( { id: this.selectedValidationId })
         .then( result => {
            console.log(result)
            this.uploadedFiles = []
            result.forEach( file => {
               let fileName = "InvalidName"
               if( file.file_location )
               {
                  const segments = file.file_location.split('/')
                  if(segments)
                  {
                     fileName = segments[ segments.length - 1 ]
                  }
               }
               
               this.uploadedFiles.push( { ...file, ...{ name:fileName } })
            })
         })
      })
      // this.uploadedFiles = [{
      //    file_type: "AlcoholTest"
      // },
      // {
      //    file_type: "DrugTest"
      // }]
   }

   onClose() {
      this.selectedEmployee = undefined;
   }

   public async onDelete(id) {
      this.dataService.deleteEmployeeValidationFile( parseInt(id) )
      // .then( () => {
      //    this.onSelectEmployee( this.selectedEmployee )
      // })
      // .catch( e => {
      //    console.log( e )
      // })
   }
   
   public onFileUpload(e, fileType) {
      e.data = { file_type: fileType, ncms_id: this.authService.getNcmsId(), "employee_validation_id": this.selectedValidationId,
      "status":"Accepted",}
   }
   public completeEventHandler(e){
      this.onSelectEmployee( this.selectedEmployee )
   }
   public validate(param)
   {
      console.log(param)
      const data = {
         id: param.id,
         first_name: param.first_name,
         last_name: param.last_name,
         Status: "Complete"
      }
      this.dataService.validateEmployee(data)
   }
   public async save()
   {
      this.isSaving = true;
      await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
      this.isSaving = false;
   }
}
