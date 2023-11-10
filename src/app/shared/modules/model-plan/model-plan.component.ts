import { ChangeDetectorRef, Component, ElementRef, 
         OnInit, TemplateRef, ViewChild} from '@angular/core';
import { process } from "@progress/kendo-data-query";
import {DataService} from '../../services/data.service'
import {AuthService} from '../../../core/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {ContactPhoneAddressComponent} from '../../components/contact-phone-address/contact-phone-address.component'
import {ComponentCanDeactivate} from '../../services/pending-changes.guard';
import {ModuleBaseComponent} from '../module-base.component'
import { environment } from '../../../../environments/environment';
import {NotificationStyledService} from '../../services/notification-styled.service';
import {
   AuditMessage, Company, FindCompanies, UpdateCompany
} from '../../models/dtos';
import {AuditService} from '../../services/audit.service';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
@Component({
   selector: 'app-model-plan',
   templateUrl: './model-plan.component.html',
   styleUrls: ['./model-plan.component.scss']
})
export class ModelPlanComponent implements OnInit, ComponentCanDeactivate {
   ncms_id: string | undefined;
   public isSaving = false;
   @ViewChild('consortiumElement') ComponentConsortium: ContactPhoneAddressComponent
   @ViewChild('designatedElement') ComponentDesignated: ContactPhoneAddressComponent
   @ViewChild('mroElement') ComponentMro: ContactPhoneAddressComponent
   @ViewChild('samhsaElement') ComponentSamhsa: ContactPhoneAddressComponent
   @ViewChild('sapElement') ComponentSap: ContactPhoneAddressComponent
   @ViewChild('eapElement') ComponentEap: ContactPhoneAddressComponent
   @ViewChild('baseComponent') ComponentBase: ModuleBaseComponent;
   @ViewChild('jobTitleEmployee') inputJobTitleEmployee;
   @ViewChild('jobTitleSupervisor') inputJobTitleSupervisior;
   instructions = 'To create a personalized Pipeline Safety drug-alcohol plan complete steps 1-3 below.';
   tpaContact = {
      id: 1,
      name: '',
      address: '',
      phone: '',
      primary: true,
   };

   derContact = {
      id: 2,
      name: '',
      address: '',
      phone: '',
      primary: false,
   };
   mroContact: any = {
      id: 3,
      name: '',
      address: '',
      phone: '',
      primary: false,
   };

   hhsContact: any = {
      id: 4,
      name: '',
      address: '',
      phone: '',
      primary: false,
   };

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
   public eapContact: any = {
      id: 5,
      name: '',
      address: '',
      phone: '',
      primary: false,
   };
   public sapContact: any = {
      id: 6,
      name: '',
      address: '',
      phone: '',
      primary: false,
   };
   public uploadSaveUrl: any = environment.BASE_URL + '/File';
   public uploadRemoveUrl: any;
   public company: any;
   public mySelection: any;
   public gridData: any[] = [];
   public gridView: any[];
   public fileTypeCPos = 'PS_COVERP'
   public fileTypeCPol = 'PS_MODELPOLICY'
   public uploadedFilesCPos: any;
   public uploadedFilesCPol: any;
   //message part
   public modelPlanForm: FormGroup = new FormGroup({});
   modelPlan = null;
   jobEmployee: String = "";
   messageForm: FormArray;
   module = 'model-plan'
   status: AuditStatus;
   isLoading = true;
   //form
   public pipeLineForm: FormGroup;
   canDeactivate(): Observable<boolean> | boolean {
      return !this.modelPlanForm.dirty;
   }

   constructor( 
      private changeDetector: ChangeDetectorRef,
      private formBuilder: FormBuilder,
      private dataService: DataService,
      private authService: AuthService,
      public auditService: AuditService,
      private notificationStyledService: NotificationStyledService) {
   }

   async ngOnInit() {
      this.pipeLineForm = this.formBuilder.group({
         originalDate: [],
         effectiveDate: [],
      });
      this.messageForm = this.formBuilder.array([]);
      try{
         this.isLoading = true;
         const client = this.dataService.getClient();
         await this.authService.fetchUser()
         this.ncms_id = this.authService.getNcmsId();

         if (this.ncms_id === '0' && localStorage.ncms_id) {
            this.ncms_id = localStorage.ncms_id;
         }

         await this.auditService.loadNeedsAttentionMessages( this.ncms_id, this.module );
         await this.auditService.loadPendingMessages( this.ncms_id, this.module );
         const result = await client.get(new FindCompanies(), {ncms_id: this.ncms_id});
         this.company = result?.results?.[0];
         this.loadCoveredPosition()
         this.completeEventHandler()
         this.onCpolUplodComplete()
         this.isLoading = false;
         let { total,results } = await this.dataService.getModelPlan(this.ncms_id)
         if( total > 0 )
         {
            this.modelPlan = results[ results.length - 1 ]
            this.deassembleModelPlan( results[ results.length - 1 ] )
         }
      }
      catch ( e ) {
         console.log( e )
      }
      this.status = this.getAuditStatus();
      this.modelPlanForm.valueChanges.subscribe(() => {
         const status = this.getAuditStatus();
         if (this.status !== status) {
            this.status = status;
            this.changeDetector.detectChanges();
         }
      })
   }
   public onFilter(inputValue: string): void {
      this.gridView = process(this.gridData, {
          filter: {
              logic: "or",
              filters: [
                  {
                      field: 'job_title',
                      operator: 'contains',
                      value: inputValue
                  },
                  {
                   field: 'job_type',
                   operator: 'contains',
                   value: inputValue
               },
              ],
          }
      }).data;
   }
   public loadCoveredPosition(){
      return new Promise( async () => {
         const data = await this.dataService.getCoveredPosition();
         this.gridData = this.gridView = data.results
      })
   }
   async onAddCoveredPosition( jobTitle, jobType )
   {
      if(jobTitle)
      {
         if( jobType == 'Employee')
         {
            this.inputJobTitleEmployee.nativeElement.value = ' ';
         }
         else
         {
            this.inputJobTitleSupervisior.nativeElement.value = ' ';
         }
         const postData = {
            "ncms_id": this.ncms_id,
            "job_title": jobTitle,
            "job_type": jobType,
            "modelPlanId": this.modelPlan.id
         }
         await this.dataService.storeCoveredPosition( postData )
         this.loadCoveredPosition()
      }
   }
   updateChildData()
   {
      this.ComponentConsortium?.updateContactData(this.tpaContact)
      this.ComponentDesignated?.updateContactData(this.derContact)
      this.ComponentMro?.updateContactData(this.mroContact)
      this.ComponentSamhsa?.updateContactData(this.hhsContact)
      this.ComponentSap?.updateContactData(this.eapContact)
      this.ComponentEap?.updateContactData(this.sapContact)
   }
   deassembleModelPlan(modelPlan)
   {
      this.tpaContact = {
         id: 1,
         name: modelPlan.policy_tpa_name,
         address: modelPlan.policy_tpa_address,
         phone: modelPlan.policy_tpa_phone,
         primary: true,
      };
      
      this.derContact = {
         id: 2,
         name: modelPlan.policy_der_name,
         address: modelPlan.policy_der_address,
         phone: modelPlan.policy_der_phone,
         primary: false,
      }
      this.mroContact = {
         id: 3,
         name: modelPlan.policy_mro_name,
         address: modelPlan.policy_mro_address,
         phone: modelPlan.policy_mro_phone,
         primary: false,
      }
      this.hhsContact = {
         id: 4,
         name: modelPlan.policy_samhsa_name,
         address: modelPlan.policy_samhsa_address,
         phone: modelPlan.policy_samhsa_phone,
         primary: false,
      }
      this.eapContact = {
         id: 5,
         name: modelPlan.policy_eap_name,
         address: modelPlan.policy_eap_address,
         phone: modelPlan.policy_eap_phone,
         primary: false,
      }
      this.sapContact = {
         id: 6,
         name: modelPlan.policy_sap_name,
         address: modelPlan.policy_sap_address,
         phone: modelPlan.policy_sap_phone,
         primary: false,
      }
      this.updateChildData()
   }
   async onSave() {
      console.info('submitted')
      //validation
      console.log(this.modelPlanForm)
      this.ComponentConsortium.syncForm()
      this.ComponentDesignated.syncForm()
      this.ComponentMro.syncForm()
      this.ComponentSamhsa.syncForm()
      this.ComponentSap.syncForm()
      this.ComponentEap.syncForm()
      if ( this.modelPlanForm.invalid ) {
         this.dataService.setShouldValidate(true);
         this.notificationStyledService.showError({content: 'Required fields are not set.'});
         return
      }
      
      //save company function
      if (  this.modelPlanForm?.dirty ) 
      {
         const companyAllForm = this.modelPlanForm.value;

         await this.dataService.getClient().put(new UpdateCompany({
            ncms_id: this.company.ncms_id,
            ...companyAllForm.companyForm,
         }));
      }

      const forms = this.modelPlanForm.value
      if(   !this.ComponentConsortium.isValid()
         || !this.ComponentDesignated.isValid()
         || !this.ComponentMro.isValid()
         || !this.ComponentSamhsa.isValid()
         || !this.ComponentSap.isValid()
         || !this.ComponentEap.isValid()
      )
      {
         this.dataService.setShouldValidate(true);
         console.log('invalid childForms')
         return
      }
      
      this.isSaving = true;
      const data = {
         policy_tpa_name: forms.consortiumElement.nameconsortiumElement,
         policy_tpa_address: forms.consortiumElement.addressconsortiumElement,
         policy_tpa_phone: forms.consortiumElement.phoneconsortiumElement,

         policy_der_name: forms.designatedElement.namedesignatedElement,
         policy_der_address: forms.designatedElement.addressdesignatedElement,
         policy_der_phone: forms.designatedElement.phonedesignatedElement,
         
         policy_mro_name: forms.mroElement.namemroElement,
         policy_mro_address: forms.mroElement. addressmroElement,
         policy_mro_phone: forms.mroElement.phonemroElement,
         
         policy_samhsa_name: forms.samhsaElement.namesamhsaElement,
         policy_samhsa_address: forms.samhsaElement.addresssamhsaElement,
         policy_samhsa_phone: forms.samhsaElement.phonesamhsaElement,
         
         policy_eap_name: forms.eapElement.nameeapElement,
         policy_eap_address: forms.eapElement.addresseapElement,
         policy_eap_phone: forms.eapElement.phoneeapElement,
         
         policy_sap_name: forms.sapElement.namesapElement,
         policy_sap_address: forms.sapElement.addresssapElement,
         policy_sap_phone: forms.sapElement.phonesapElement,
         ncms_id: this.ncms_id,
         policies_list: [
            {
              "action": "string",
              "company_name": "string",
              "company_address": "string",
              "company_phone": "string",
              "file_name": "string",
              "file_guid": "string",
              "file_salt": "string",
              "ModelPlanId": 0,
              "ModelPlan": {},
              "id": 0,
              "ncms_id": "string"
            }
         ],
         covered_positions: [
            {
              "job_title": "string",
              "job_type": "string",
              "ModelPlanId": 0,
              "ModelPlan": {},
              "id": 0,
              "ncms_id": "string"
            }
         ],
         terms_agreements: [
            {
              "terms_agreed": "string",
              "terms_guid": "string",
              "ModelPlanId": 0,
              "ModelPlan": {},
              "id": 0,
              "ncms_id": "string"
            }
         ],
      }
      await this.dataService.storeModelPlan(data)
      await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
      this.dataService.setShouldValidate(false);
      this.ComponentBase.moveNext()
      
      this.isSaving = false;
   }
   public onFileUpload(e, type) {
      const name = e.files[0].name;
      e.data = { type: type, ncms_id: this.ncms_id, name: name}
   }
   public completeEventHandler() {
      const res = this.dataService.getFiles(this.fileTypeCPos).then(res => {
         const results = res['results'];
         const data = [];
         results.forEach((file, key) => {
           data.push({
             name: file.path.split('_')[1],
             id: file.id
           });
         });
         this.uploadedFilesCPos = data;
       });
   }
   public onCpolUplodComplete()
   {
      const res = this.dataService.getFiles(this.fileTypeCPol).then(res => {
         const results = res['results'];
         const data = [];
         results.forEach((file, key) => {
           data.push({
             name: file.path.split('_')[1],
             id: file.id
           });
         });
         this.uploadedFilesCPol = data;
       });
   }
   public getAuditStatus() {
      const auditForm = <FormArray>this.modelPlanForm?.get('auditForm');
      return this.auditService.getAuditStatus(auditForm);
   }
}
