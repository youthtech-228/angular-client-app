import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/dtos';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuditService} from '../../../services/audit.service';
import {DataService} from '../../../services/data.service';

@Component({
   selector: 'app-requirements',
   templateUrl: './requirements.component.html',
   styleUrls: ['./requirements.component.scss'],
})
export class RequirementsComponent implements OnInit {
   section = 'requirements';
   @Input() company: Company;
   @Input() module: string;
   @Input() companyAllForm: FormGroup;

   companyRequirementsForm: FormGroup;
   auditAllForm: FormArray;

   constructor(private formBuilder: FormBuilder, public auditService: AuditService, private dataService: DataService) {
   }

   ngOnInit() {
      this.companyRequirementsForm = this.formBuilder.group({
         phmsa: [this.company?.phmsa, Validators.required],
         fmcsa: [this.company?.fmcsa, Validators.required],
         faa: [this.company?.faa, Validators.required],
         fra: [this.company?.fra, Validators.required],
         uscg: [this.company?.uscg, Validators.required],
      });
      this.companyAllForm.addControl('companyRequirementsForm', this.companyRequirementsForm);

      this.auditAllForm = this.formBuilder.array([]);
   }

   public async save() {
      await this.dataService.updateAuditMessages(this.auditAllForm);
   }

   public getAuditStatus() {
      return this.auditService.getAuditStatus(this.auditAllForm);
   }
}
