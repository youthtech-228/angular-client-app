import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
   selector: 'app-company-form',
   templateUrl: './company-form.component.html',
   styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
   section = 'company';
   @Input() company: Company;
   @Input() module: string;
   @Input() companyAllForm: FormGroup;
   public companyForm: FormGroup;
   public auditAllForm: any;
   public name: any;

   constructor(private formBuilder: FormBuilder) {}

   ngOnInit(): void {
      this.companyForm = this.formBuilder.group({
         ncms_id: [this.company?.ncms_id],
         name: [this.company?.name],
         mailing_address: [this.company?.mailing_address],
         mailing_city: [this.company?.mailing_city],
         mailing_state: [this.company?.mailing_state],
         mailing_zip: [this.company?.mailing_zip],
         phone: [this.company?.phone, Validators.required],
      });
      this.companyAllForm.addControl('companyForm', this.companyForm);

      this.auditAllForm = this.companyAllForm.get('auditForm');

      if (!this.auditAllForm) {
         this.auditAllForm = this.formBuilder.array([]);
         this.companyAllForm.addControl('auditForm', this.auditAllForm);
      }
   }
}
