import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import {DataService} from '../../services/data.service';
import {ModuleBaseComponent} from '../module-base.component'
import {AuditService} from '../../services/audit.service';
@Component({
  selector: 'app-return-to-duty',
  templateUrl: './return-to-duty.component.html',
  styleUrls: ['./return-to-duty.component.scss']
})
export class ReturnToDutyComponent implements OnInit {
  public instructions = `
    A verified positive DOT drug test result, a DOT alcohol test with a result indicating an alcohol concentration of 0.04 or greater, a refusal to test (including by adulterating or substituting a urine specimen) or any other violation of the prohibition on the use of alcohol or drugs under a DOT agency regulation constitutes a DOT drug and alcohol regulation violation. All individuals with a drug and/or alcohol violation must be immediately removed from performing covered job functions. As the employer, you must not return the individual to perform a covered function until or unless the individual successfully completes the return-to-duty process.<br><br>
    As an employer you must provide to each employee (including an applicant or new employee), who violates a DOT drug and alcohol regulation, a list of Substance Abuse Professionals which includes names, addresses and telephone numbers.<br><br>
    As an employer, you are not required to provide a SAP evaluation or any subsequent recommended education or treatment for an employee who has violated a DOT drug and alcohol regulation. However, if you offer an employee the opportunity to return to a DOT safety-sensitive job function you must, before the employee again performs that duty, ensure that the employee receives an evaluation by a SAP that meets the requirements and successfully complies with the SAP’s evaluation recommendations.
  `;
  @ViewChild('baseComponent') ComponentBase: ModuleBaseComponent;
  module = 'return-to-duty';
  messageForm: FormArray;
  ncms_id: string;
  pageForm: FormGroup;
  isLoading = true;
  isSaving = false;
  isComplete = false;
  sapAgreeVisible = false
  sapExplantionVisible = false
  id = null
  alertMessage={ show: true, class: "danger" }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public auditService: AuditService ){}

  async ngOnInit() {
    this.isLoading = true;
    this.messageForm = this.formBuilder.array([]);
    //get ncms_id
    await this.authService.fetchUser();
    this.ncms_id = this.authService.getNcmsId();
    if (this.ncms_id === '0' && localStorage.ncms_id) {
      this.ncms_id = localStorage.ncms_id;
    }
    //load Return to Duty
    const data = await this.dataService.getReturnToDuty({
      ncms_id: this.ncms_id
    })
    let formData = {
                    isDotSafe: [],
                    isSapSafe: [],
                    sapRtdAgree: [],
                    sapRtdExplanation: []
                  }
    if( data.total > 0 )
    {
      const returnToDuty = data[ 'results' ][ 0 ]
      this.id = returnToDuty.id
      //form init
      formData =  {
                    isDotSafe: [ returnToDuty[ 'saprtd_process' ] ],
                    isSapSafe: [ returnToDuty[ 'saprtd_referral_list' ] ? "1" : "0" ],
                    sapRtdAgree: [ returnToDuty[ 'saprtd_agree' ] ],
                    sapRtdExplanation: [ returnToDuty[ 'saprtd_explanation' ] ]
                  }

      this.formListener( 
        formData[ "isDotSafe" ][ 0 ], 
        formData[ "isSapSafe" ][ 0 ], 
        formData[ "sapRtdAgree" ][ 0 ], 
        formData[ "sapRtdExplanation" ][ 0 ] )
    }
    
    this.pageForm = this.formBuilder.group( formData )
    this.pageForm.valueChanges.subscribe(() => {
      //Check Complete
      let { isDotSafe, isSapSafe, sapRtdAgree, sapRtdExplanation } = this.pageForm.value
      this.formListener( isDotSafe, isSapSafe, sapRtdAgree, sapRtdExplanation )
    });
    //load Messages
    await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module);
    await this.auditService.loadPendingMessages(this.ncms_id, this.module);
    this.isLoading = false;
  }
  formListener( isDotSafe, isSapSafe, sapRtdAgree, sapRtdExplanation )
  {
    //Dot Safe
    const dotSafe = isDotSafe == 0 || ( isDotSafe == 1 && sapRtdAgree )
    //Sap Safe
    const sapSafe = isSapSafe == 1 || ( isSapSafe == 0 && sapRtdExplanation != "" )
    this.isComplete = dotSafe && sapSafe
    this.sapAgreeVisible = isDotSafe == 1
    this.sapExplantionVisible = isSapSafe == 0
    this.alertMessage.show = true
    this.alertMessage.class = this.isComplete ? "success" : "danger"
  }
  async onSave()
  {
    if( !this.isComplete ) return false
    try {
      this.isSaving = true;
      //save formData
      let { isDotSafe, isSapSafe, sapRtdAgree, sapRtdExplanation } = this.pageForm.value
      let param = {
        ncms_id: this.ncms_id,
        saprtd_process: isDotSafe,
        saprtd_referral_list: isSapSafe,
        saprtd_agree: sapRtdAgree,
        saprtd_explanation: sapRtdExplanation
      }
      if( this.id != null )
      {
        param = { ...param, ...{ id: this.id } }
        await this.dataService.updateReturnToDuty( param )
      }
      else
      {
        await this.dataService.storeReturnToDuty( param )
      }
      //save messages
      await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
      await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
      await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
      this.isSaving = false;
      this.ComponentBase.moveNext()
    }
    catch{
      this.isSaving = false;
    }
  }
}
