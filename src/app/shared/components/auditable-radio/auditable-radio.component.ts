import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {User} from '../../models/dtos';
import {AuthService} from '../../../core/auth.service';
import {AuditService} from '../../services/audit.service';

@Component({
   selector: 'app-auditable-radio',
   templateUrl: './auditable-radio.component.html',
   styleUrls: ['./auditable-radio.component.scss']
})
export class AuditableRadioComponent implements OnInit {
   @Input() ncms_id: string;
   @Input() module: string;
   @Input() section: string;
   @Input() field_name: string;
   @Input() record_name: string;
   @Input() record_id: any;
   @Input() label: string;
   @Input() options: string[] = ['Yes', 'No'];
   @Input() forName: any;
   @Input() inputForm: any;
   @Input() auditAllForm: FormArray;

   auditForm: any;

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
      private authService: AuthService, private auditService: AuditService) {
   }

   ngOnInit(): void {
      const user: User = this.authService.getUser();

      const field_id = this.auditService.getFieldId(this.module, this.section, this.field_name, this.record_id);
      const auditMessage = this.auditService.findFieldAuditMessage(this.ncms_id, field_id);

      this.auditForm =
         this.auditService.createAuditMessageForm(this.formBuilder, auditMessage, {
            ncms_id: this.ncms_id, module: this.module,
            section: this.section, field_name: this.field_name, record_id: this.record_id, label: this.label
         }, user);

      this.auditAllForm.push(this.auditForm);
   }
}
