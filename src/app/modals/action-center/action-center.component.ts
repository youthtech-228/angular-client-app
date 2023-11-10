import { Component, OnInit } from '@angular/core';

export enum AttemptsType {
   all = 'All',
   first = 'First',
   second = 'Second',
   third = 'Third',
}

@Component({
  selector: 'app-action-center',
  templateUrl: './action-center.component.html',
  styleUrls: ['./action-center.component.scss']
})
export class ActionCenterComponent implements OnInit {

   public allowSave = true;
   public mouseOvered: AttemptsType;
   public selected: AttemptsType = AttemptsType.first;
   public value: any;

   companyList = [
      {
         id: 1,
         name: 'ABC Company',
         lockedUser: 'Fran Auditor',
         attempts: 2,
         locked: true,
      },
      {
         id: 2,
         name: 'Oilfield Ops Professionals',
         lockedUser: '',
         attempts: 1,
         locked: false,
         messages: [
            {
               id: 1,
               title: 'DBA Name',
               text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
               author: 'Michael Wasson (NCMS)',
               date: '11/9/2020 4:27PM',
               pass: false,
            },
            {
               id: 2,
               title: '',
               text: 'This message is created using the button above and may or may not be tied to a particular input.',
               author: 'Michael Wasson (NCMS)',
               date: '11/12/2020 4:27PM',
               pass: true,
            },
            {
               id: 3,
               title: 'Federal ID',
               text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
               author: 'Michael Wasson (NCMS)',
               date: '11/9/2020 4:27PM',
               pass: false,
               replies: [
                  {
                     id: 4,
                     parentId: 3,
                     title: '',
                     text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
                     author: 'Jonas Wiltheim (JT Industries)',
                     date: '11/18/2020 3:27AM',
                     pass: true,
                  },
                  {
                     id: 2,
                     title: '',
                     text: 'This message is created using the button above and may or may not be tied to a particular input.',
                     author: 'Michael Wasson (NCMS)',
                     date: '11/12/2020 4:27PM',
                     pass: true,
                  },
               ],
            },
         ],
      },
      {
         id: 3,
         name: 'Walter-Bower Industrial Equipment Supply',
         lockedUser: '',
         attempts: 1,
         locked: false,
         messages: [
            {
               id: 1,
               title: 'DBA Name',
               text: 'This is a test message created by clicking on the field label.',
               author: 'Michael Wasson (NCMS)',
               date: '11/9/2020 4:27PM',
               pass: false,
            },
            {
               id: 3,
               title: 'Federal ID',
               text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
               author: 'Michael Wasson (NCMS)',
               date: '11/9/2020 4:27PM',
               pass: false,
               replies: [
                  {
                     id: 4,
                     parentId: 3,
                     title: '',
                     text: 'This is a test message created by clicking on the field label. This message is auto-generated when the auditor taps the label. Tapping again could What if there one?',
                     author: 'Jonas Wiltheim (JT Industries)',
                     date: '11/18/2020 3:27AM',
                     pass: true,
                  },
               ]
            },
         ]
      },
      {
         id: 4,
         name: 'Acme Oil Company',
         lockedUser: undefined,
         attempts: 3,
         locked: false,
      },
   ];

   public selectedCompany: any = this.companyList[1];
   // public selectedCompany: any;


  constructor() { }

  ngOnInit(): void {
  }

   public handleSelect(event: any) {
      this.selectedCompany = event;
   }
}
