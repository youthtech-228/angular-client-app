import {Component, OnInit, ViewChild} from '@angular/core';
import {employees} from '../../../components/employee-list/employees';
import {process} from '@progress/kendo-data-query';
import {DataBindingDirective} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-supervisor-traning-list',
  templateUrl: './supervisor-traning-list.component.html',
  styleUrls: ['./supervisor-traning-list.component.scss']
})
export class SupervisorTraningListComponent implements OnInit {
   @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
   public gridData: any[] = employees;
   public gridView: any[];
   public mySelection: string[] = [];

  constructor() { }

  ngOnInit(): void {
     this.gridView = this.gridData;
  }

   public onFilter(inputValue: string): void {
      this.gridView = process(this.gridData, {
         filter: {
            logic: 'or',
            filters: [
               {
                  field: 'first_name',
                  operator: 'contains',
                  value: inputValue
               },
               {
                  field: 'last_name',
                  operator: 'contains',
                  value: inputValue
               },
               {
                  field: 'last_four',
                  operator: 'contains',
                  value: inputValue
               },
            ],
         }
      }).data;

      this.dataBinding.skip = 0;
   }

}
