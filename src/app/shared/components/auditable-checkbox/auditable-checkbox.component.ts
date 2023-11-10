import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {AuditMessage, User} from '../../models/dtos';
import {AuditService} from '../../services/audit.service';
import {AuthService} from '../../../core/auth.service';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuditMessageSelectService} from '../../services/audit-message-select.service';

/**
 * Component to edit a single auditable checkbox.
 *
 * CAVEAT: The parent formGroup must have "auditForm" which is a FormArray containing the audit forms.
 */
@Component({
  selector: 'app-auditable-checkbox',
  templateUrl: './auditable-checkbox.component.html',
  styleUrls: ['./auditable-checkbox.component.scss']
})
export class AuditableCheckboxComponent implements OnInit {
   @Input() ncms_id: string;
   @Input() label: any;
   @Input() forName: any;
   @Input() message: string;
   @Input() field_id: string;
   @Input() inputForm: any;
   @Input() auditAllForm: FormArray;

   auditMessage: AuditMessage;
   auditForm: any;
   field_name: string;

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
      private authService: AuthService, private auditService: AuditService,
      private auditMessageSelectService: AuditMessageSelectService) {
   }

  ngOnInit(): void {
     const [module, section, field_name] = this.field_id.split('.');
     this.field_name = field_name;
     const user: User = this.authService.getUser();

     this.auditMessage = this.auditService.findFieldAuditMessage(this.ncms_id, this.field_id);

     this.auditForm =
        this.auditService.createAuditMessageForm(this.formBuilder, this.auditMessage, {ncms_id: this.ncms_id, module,
           section, field_name, label: this.label, message_text: this.message}, user);

     this.auditAllForm.push(this.auditForm);
  }

   public selectAuditMessage($event: any) {
      if ($event === AuditStatus.NEEDS_ATTENTION) {
         this.auditForm?.patchValue({notification_status: undefined});
      }
      const [module, section, field] = this.auditService.getPath(this.auditMessage);
      const field_id = this.auditService.getFieldId(module, section, field);

      const replyRequired = this.auditMessage.status === AuditStatus.PENDING_REVIEW && $event ===
         AuditStatus.NEEDS_ATTENTION;
      this.auditMessageSelectService.select(field_id, replyRequired);
   }
}
