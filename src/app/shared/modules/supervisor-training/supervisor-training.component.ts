import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-training',
  templateUrl: './supervisor-training.component.html',
  styleUrls: ['./supervisor-training.component.scss']
})
export class SupervisorTrainingComponent implements OnInit {
   messages = [
      {
         title: 'DBA Name',
         text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
         author: 'Michael Wasson (NCMS)',
         date: '11/9/2020 4:27PM',
         pass: false,
      },
      {
         title: '',
         text: 'This message is created using the button above and may or may not be tied to a particular input.',
         author: 'Michael Wasson (NCMS)',
         date: '11/12/2020 4:27PM',
         pass: true,
      },
   ];
   public uploadSaveUrl: any;
   public uploadRemoveUrl: any;

  constructor() { }

  ngOnInit(): void {
  }

}
