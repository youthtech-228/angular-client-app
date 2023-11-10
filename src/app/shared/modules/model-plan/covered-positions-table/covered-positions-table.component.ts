import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covered-positions-table',
  templateUrl: './covered-positions-table.component.html',
  styleUrls: ['./covered-positions-table.component.scss']
})
export class CoveredPositionsTableComponent implements OnInit {
   public mySelection: any;
   public gridView: any;

  constructor() { }

  ngOnInit(): void {
  }

   public onFilter(value: any) {

   }
}
