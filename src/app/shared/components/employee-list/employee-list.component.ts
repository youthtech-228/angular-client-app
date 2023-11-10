import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';
import {FileRestrictions} from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
   @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
   public gridData: any[] = employees;
   public gridView: any[];
   uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
   uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
   myRestrictions: FileRestrictions = {
      allowedExtensions: ['pdf', 'xlsx', '.jpg', '.png'],
      maxFileSize: 304,
      // maxFileSize: 4194304,
   };
   public mySelection: string[] = [];

   public ngOnInit(): void {
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
               {
                  field: 'test_type',
                  operator: 'contains',
                  value: inputValue
               },
               {
                  field: 'ncms_comment',
                  operator: 'contains',
                  value: inputValue
               },
               {
                  field: 'pool',
                  operator: 'contains',
                  value: inputValue
               },
            ],
         }
      }).data;

      this.dataBinding.skip = 0;
   }

   private photoURL(dataItem: any): string {
      const code: string = dataItem.img_id + dataItem.gender;
      const image: any = images;

      return image[code];
   }

   private flagURL(dataItem: any): string {
      const code: string = dataItem.country;
      const image: any = images;

      return image[code];
   }

  // constructor() { }
  //
  // ngOnInit(): void {
  // }

}
