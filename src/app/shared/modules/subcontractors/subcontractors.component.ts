import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../../../core/auth.service';
import {DataService} from '../../services/data.service';
import {ModuleBaseComponent} from '../module-base.component'
import {AuditService} from '../../services/audit.service';
@Component({
  selector: 'app-subcontractors',
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.scss']
})
export class SubcontractorsComponent implements OnInit {
  @ViewChild('baseComponent') ComponentBase: ModuleBaseComponent;
  public instructions: any;
  module = 'subcontractors';
  public pageForm: FormGroup;
  messageForm: FormArray;
  ncms_id: string;
  isLoading = true;
  isSaving = false;
  isComplete = false;
  alertMessage={ show: true, class: "danger" }
  constructor(  
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    public auditService: AuditService ){}

  async ngOnInit() {
    this.isLoading = true;//form init
    this.pageForm = this.formBuilder.group({
      isDot: [],
    })
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
    this.isLoading = false;
    this.pageForm.valueChanges.subscribe(() => {
      //Check Complete
      let { isDot } = this.pageForm.value
      this.isComplete = isDot
      this.alertMessage.show = true
      this.alertMessage.class = this.isComplete ? "success" : "danger"
    });
  }
  async onSave()
  {
    if( !this.isComplete ) return false
    this.isSaving = true;
    await this.dataService.updateAuditMessages(<FormArray>this.messageForm);
    await this.auditService.loadNeedsAttentionMessages(this.ncms_id, this.module, true);
    await this.auditService.loadPendingMessages(this.ncms_id, this.module, true);
    this.isSaving = false;
    this.ComponentBase.moveNext()
  }

}
