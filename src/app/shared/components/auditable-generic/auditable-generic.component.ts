import {Component, Input, OnInit} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuditMessage, User} from '../../models/dtos';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../../core/auth.service';
import {AuditService} from '../../services/audit.service';
import {AuditMessageSelectService} from '../../services/audit-message-select.service';

@Component({
   selector: 'app-auditable-generic',
   templateUrl: './auditable-generic.component.html',
   styleUrls: ['./auditable-generic.component.scss']
})
export class AuditableGenericComponent implements OnInit {
   eAuditStatus = AuditStatus;
   ncms_id: string;
   @Input() label: string;
   @Input() module: string;
   @Input() section: string;
   @Input() field_name: string;
   @Input() record_id: any;
   @Input() forName: string;
   @Input() auditAllForm: FormArray;

   auditForm: FormGroup;
   auditMessage: AuditMessage;

   constructor(private formBuilder: FormBuilder, public dataService: DataService, public authService: AuthService,
      private auditService: AuditService, private auditMessageSelectService: AuditMessageSelectService) {
      this.ncms_id = this.authService.getNcmsId();
   }

   ngOnInit(): void {
      const user: User = this.authService.getUser();

      const field_id = this.auditService.getFieldId(this.module, this.section, this.field_name, this.record_id);
      this.auditMessage = this.auditService.findFieldAuditMessage(this.ncms_id, field_id);

      this.auditForm =
         this.auditService.createAuditMessageForm(this.formBuilder, this.auditMessage, {
            ncms_id: this.ncms_id, module: this.module,
            section: this.section, field_name: this.field_name, record_id: this.record_id, label: this.label
         }, user);

      // this.auditForm.valueChanges.subscribe((test) => {
      //    console.log(test);
      //
      //    debugger;
      // });

      // this.auditAllForm.valueChanges.subscribe((test) => {
      //    console.log(test);
      //    console.log(this);
      //    const foundIndex = findIndex(this.auditAllForm.controls, this.auditForm);
      //    console.log(foundIndex);
      //    debugger;
      // });
      // this.auditAllForm.Changes.subscribe((test) => {
      //    console.log(test);
      //    console.log(this);
      //    const foundIndex = findIndex(this.auditAllForm.controls, this.auditForm);
      //    console.log(foundIndex);
      //    debugger;
      // });
      this.auditAllForm.push(this.auditForm);
   }

   /**
    * Get the audit message status.
    */
   getAuditMessageStatus() {
      return this.auditForm.getRawValue().status;
   }

   /**
    * Select the audit message when the user edits or clicks the label.
    */
   public selectAuditMessage(newStatus) {
      if (newStatus === AuditStatus.NEEDS_ATTENTION) {
         this.auditForm?.patchValue({notification_status: undefined});
      }

      const field_id = this.auditService.getFieldId(this.module, this.section, this.field_name, this.record_id);

      const replyRequired = this.auditMessage.status === AuditStatus.PENDING_REVIEW && newStatus ===
         AuditStatus.NEEDS_ATTENTION;
      this.auditMessageSelectService.select(field_id, replyRequired);
   }
}
