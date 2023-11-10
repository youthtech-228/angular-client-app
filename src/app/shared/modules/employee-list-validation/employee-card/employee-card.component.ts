import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
   selector: 'app-employee-card',
   templateUrl: './employee-card.component.html',
   styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
   @Input() employee: any;
   @Output() validateEvent = new EventEmitter();

   constructor() {
   }

   ngOnInit(): void {
   }
   
   validate() {
      this.validateEvent.emit(this.employee);
   }
}
