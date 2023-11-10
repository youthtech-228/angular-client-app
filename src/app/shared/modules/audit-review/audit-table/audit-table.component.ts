import { Component, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import {DataBindingDirective, DataStateChangeEvent, GridComponent} from '@progress/kendo-angular-grid';
import { take } from 'rxjs/operators';
import {AuditStatus} from '../../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.scss']
})
export class AuditTableComponent implements AfterViewInit {
   @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
   @ViewChild(GridComponent) grid: GridComponent;

   public eAuditStatus: AuditStatus;

   public gridData: any[] = [
      {
         status: AuditStatus.PASSED,
         audit: 'Instructions',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.NEEDS_ATTENTION,
         audit: 'Company Information',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Model Plan',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Employee Awareness',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Testing Forms',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Return to Duty',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Subcontractors',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'History Checks',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Random Process',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Statistical Data',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PENDING_REVIEW,
         audit: 'Employee List Validation',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Supervisor Training',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Medical Review Officer',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Helpful Information',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
      {
         status: AuditStatus.PASSED,
         audit: 'Audit Review',
         ncms_official: 'John Smith',
         ncms_official_date: '1/1/2021',
         contractor_representative: 'Bob Jones',
         contractor_representative_date: '1/2/2021',
      },
   ];
   public gridView: any[];
   // public grid: GridComponent;
   public mySelection: string[] = [];

  constructor(private ngZone: NgZone) { }

  // ngOnInit(): void {
  // }

   public  ngAfterViewInit(): void {
     // this.gridView = this.gridData;
      this.fitColumns();
   }

   public onDataStateChange($event: DataStateChangeEvent): void {
      this.fitColumns();
   }

   private fitColumns(): void {
      this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
         this.grid.autoFitColumns();
      });
   }

   // public onFilter(inputValue: string): void {
   //    this.gridView = process(this.gridData, {
   //       filter: {
   //          logic: 'or',
   //          filters: [
   //             {
   //                field: 'audit',
   //                operator: 'contains',
   //                value: inputValue
   //             },
   //             {
   //                field: 'ncms_official',
   //                operator: 'contains',
   //                value: inputValue
   //             },
   //             {
   //                field: 'contractor_representative',
   //                operator: 'contains',
   //                value: inputValue
   //             },
   //          ],
   //       }
   //    }).data;
   //
   //    this.dataBinding.skip = 0;
   // }

}
