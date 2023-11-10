import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-center',
  template: `
     <div class="message-center pointable">
        <h4>
           <ng-content select="message-center-title"></ng-content>
        </h4>
        <ng-content select="message-center-body" *ngIf="visible"></ng-content>
     </div>
  `,
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {
   visible = true;

  constructor() { }

  ngOnInit(): void {
  }

}
