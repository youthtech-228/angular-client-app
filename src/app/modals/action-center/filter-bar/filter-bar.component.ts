import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
   public value: any;
   public unread: any;

  constructor() { }

  ngOnInit(): void {
  }

}
