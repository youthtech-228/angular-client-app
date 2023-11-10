import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

export enum CompanyStatus {
   locked = 'locked',
   selected = 'selected',
   normal = 'normal',
}

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
   @Input() selected = false;
   @Input() company: any;
   @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

   public handleClick() {
      this.select.emit(this.company);
   }
}
