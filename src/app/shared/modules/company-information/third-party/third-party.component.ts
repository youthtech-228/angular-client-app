import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/dtos';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuditService} from '../../../services/audit.service';
import {DataService} from '../../../services/data.service';
import {AuditStatus} from '../../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-third-party',
  templateUrl: './third-party.component.html',
  styleUrls: ['./third-party.component.scss'],
})
export class ThirdPartyComponent implements OnInit {
   section = 'thirdParty';
   @Input() company: Company;
   @Input() module: string;
   @Input() companyAllForm: FormGroup;

   thirdPartyForm: FormGroup;
   auditAllForm: FormArray;
   status: AuditStatus;

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
      public auditService: AuditService, private dataService: DataService) {
   }

  ngOnInit() {
     this.thirdPartyForm = this.formBuilder.group({
        uses_tpa: [this.company?.uses_tpa],
        tpa_name: [this.company?.tpa_name],
     });

     this.companyAllForm.addControl('thirdPartyForm', this.thirdPartyForm);

     this.auditAllForm = this.formBuilder.array([]);
     this.auditAllForm.valueChanges.subscribe(() => {
        const status = this.auditService.getAuditStatus(this.auditAllForm);

        if (this.status !== status) {
           this.status = status;
           this.changeDetector.detectChanges();
        }
     });

     this.companyAllForm.addControl('thirdPartyAuditForm', this.auditAllForm);
  }

   public async save() {
      await this.dataService.updateAuditMessages(this.auditAllForm);
   }
}
