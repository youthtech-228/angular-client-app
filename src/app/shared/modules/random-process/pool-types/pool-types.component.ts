import {Component, Input, OnInit} from '@angular/core';
import {RandomProcess} from '../../../models/dtos';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../core/auth.service';
import {forOwn} from 'lodash-es';

@Component({
   selector: 'app-pool-types',
   templateUrl: './pool-types.component.html',
   styleUrls: ['./pool-types.component.scss']
})
export class PoolTypesComponent implements OnInit {
   @Input() randomProcess: RandomProcess;
   @Input() module: string;
   @Input() section: string;
   @Input() auditAllForm: FormArray;
   @Input() inputForm: FormGroup;

   poolForm: FormGroup;


   constructor(private formBuilder: FormBuilder, public authService: AuthService) {
   }


   ngOnInit(): void {

      const poolForm = this.formBuilder.group({
         faa: this.randomProcess.faa,
         faa_alcohol_percent: this.randomProcess?.faa_alcohol_percent,
         faa_drug_percent: this.randomProcess?.faa_drug_percent,
         fra: this.randomProcess.fra,
         fra_alcohol_percent: this.randomProcess?.fra_alcohol_percent,
         fra_drug_precent: this.randomProcess?.fra_drug_precent,
         phmsa: this.randomProcess.phmsa,
         phmsa_drug_precent: this.randomProcess?.phmsa_drug_precent,
         uscg: this.randomProcess.uscg,
         uscg_drug_percent: this.randomProcess?.uscg_drug_percent,
         fmcsa: this.randomProcess.fmcsa,
         fmcsa_alcohol_percent: this.randomProcess?.fmcsa_alcohol_percent,
         fmcsa_drug_percent: this.randomProcess?.fmcsa_drug_percent,
      });
      forOwn(poolForm.controls, (value, key) => {
         this.inputForm.addControl(key, value);
      });
   }
}
