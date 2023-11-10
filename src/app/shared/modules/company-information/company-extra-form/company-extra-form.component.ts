import {Component, Input, OnInit} from '@angular/core';
import {AuditMessage, Company} from '../../../models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuditService} from '../../../services/audit.service';

/**
 * Form for extra properties that are only used here and not reused elsewhere.
 */
@Component({
   selector: 'app-company-extra-form',
   templateUrl: './company-extra-form.component.html',
   styleUrls: ['./company-extra-form.component.scss']
})
export class CompanyExtraFormComponent implements OnInit {
   section = 'company';
   @Input() company: Company;
   @Input() module: string;
   @Input() companyAllForm: FormGroup;
   public companyExtraForm: FormGroup;
   public auditAllForm: any;
   auditMessages: AuditMessage[];

   constructor(private formBuilder: FormBuilder, private auditService: AuditService) {}

   ngOnInit(): void {
      this.companyExtraForm = this.formBuilder.group({
         previous_name:       [this.company?.previous_name],
         dba_name:   [this.company?.dba_name],
         federal_id: [this.company?.federal_id,    Validators.required],
         isnid: [this.company?.isnid],
         type_of_work: [this.company?.type_of_work,    Validators.required],
      });
      this.companyAllForm.addControl('companyExtraForm', this.companyExtraForm);

      this.auditAllForm = this.companyAllForm.get('auditForm');

      if (!this.auditAllForm) {
         this.auditAllForm = this.formBuilder.array([]);
         this.companyAllForm.addControl('auditForm', this.auditAllForm);
      }
      this.auditMessages = this.auditService.findSectionAuditMessage(this.company?.ncms_id, this.module, this.section);
   }

   public getFieldAuditMessage(field: string): AuditMessage {
      const messages = this.auditService.getFieldAuditMessages(this.auditMessages, field);
      return messages?.[0] || <AuditMessage>{};
   }
}
