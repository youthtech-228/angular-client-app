import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {FindCompanies} from '../../../shared/models/dtos';
import {map} from 'lodash-es';
import {DataService} from '../../../shared/services/data.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

   ncmsIdList: string[];

  constructor(private authService: AuthService, private dataService: DataService, private changeDetector: ChangeDetectorRef, ) { }

  async ngOnInit(): Promise<void> {
     await this.authService.fetchUser();
  }

   getNcmsIdList() {
      if (this.authService.isAuditor()) {
         if (!this.ncmsIdList) {
            this.ncmsIdList = [];
            const client = this.dataService.getClient();
            client.get(new FindCompanies()).then(result => {
               const companies = result?.results;
               this.ncmsIdList = map(companies, 'ncms_id');
            });
         } else {
            return this.ncmsIdList;
         }
      } else {
         return ['N/A'];
      }
   }

   public handleChangeNcmsId(ncmsId: string) {
      this.authService.setNcmsId(ncmsId);
      this.changeDetector.detectChanges();
   }
}
