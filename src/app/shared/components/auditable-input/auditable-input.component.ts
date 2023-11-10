import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuthService} from '../../../core/auth.service';
import {AuditMessage, User} from '../../models/dtos';
import {DataService} from '../../services/data.service';
import {AuditService} from '../../services/audit.service';
import {AuditMessageSelectService} from '../../services/audit-message-select.service';

/**
 * Component to edit a single auditable input.
 *
 * CAVEAT: The parent formGroup must have "auditForm" which is a FormArray containing the audit forms.
 */
@Component({
   selector: 'app-auditable-input',
   templateUrl: './auditable-input.component.html',
   styleUrls: ['./auditable-input.component.scss']
})
export class AuditableInputComponent implements OnInit {
   eAuditStatus = AuditStatus;
   @Input() ncms_id: string;
   @Input() label: string;
   @Input() module: string;
   @Input() section: string;
   @Input() field_name: string;
   @Input() record_id: any;
   @Input() forName: string;
   @Input() placeholder: any;
   @Input() inputForm: FormGroup;
   @Input() auditAllForm: FormArray;
   @Input() isPhone = false;
   @Input() rows: number;
   @Input() cols: number;

   auditForm: FormGroup;
   auditMessage: AuditMessage;

   constructor(private formBuilder: FormBuilder, private authService: AuthService, private dataService: DataService,
      private auditService: AuditService, private auditMessageSelectService: AuditMessageSelectService) {
   }

   /**
    * On init setup the auditForm. Adds the audit form to the auditFormArray.
    */
   public ngOnInit(): void {
      if (!this.placeholder) {
         this.placeholder = this.label;
      }
      const user: User = this.authService.getUser();

      const  field_id = this.auditService.getFieldId(this.module, this.section, this.field_name, this.record_id);
      this.auditMessage = this.auditService.findFieldAuditMessage(this.ncms_id, field_id);

      this.auditForm =
         this.auditService.createAuditMessageForm(this.formBuilder, this.auditMessage, {ncms_id: this.ncms_id, module: this.module,
            section: this.section, field_name: this.field_name, record_id: this.record_id, label: this.label}, user);

      this.auditAllForm.push(this.auditForm);
   }

   /**
    * Get the audit message status.
    */
   getAuditMessageStatus() {
      return this.auditForm.getRawValue().status;
   }

   /**
    * Callback when the input changes.
    *
    * NOTE: When the input changes, set the status to PENDING if the user is a Contractor.
    */
   public async change() {
      if (this.authService.isContractor()) {
         this.auditForm?.patchValue({status: this.eAuditStatus.PENDING_REVIEW});
      }
   }

   /**
    * Select the audit message when the user edits or clicks the label.
    */
   public statusChangeAuditMessage(newStatus) {
      this.auditForm?.patchValue({notification_status: undefined});
      const field_id =  this.auditService.getFieldId(this.module, this.section, this.field_name, this.record_id);

      const replyRequired = this.auditMessage.status === AuditStatus.PENDING_REVIEW && newStatus === AuditStatus.NEEDS_ATTENTION;
      this.auditMessageSelectService.select(field_id, replyRequired);
   }

   public shouldValidate() {
      return this.dataService.shouldValidate();
   }
}
