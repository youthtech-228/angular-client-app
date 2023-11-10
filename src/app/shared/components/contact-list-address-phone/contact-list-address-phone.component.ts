import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list-address-phone',
  templateUrl: './contact-list-address-phone.component.html',
  styleUrls: ['./contact-list-address-phone.component.scss']
})
export class ContactListAddressPhoneComponent implements OnInit {
   contactList: any = [
      {
         id: 1,
         name: 'Debbie Hamilton',
         address: '100 First Street, Hutchinson, KS',
         phone: '316-555-1212',
         primary: true,
      },
      {
         id: 2,
         name: 'Ree Grundelwold',
         address: 'E. Plum Street, Hutchinson, KS',
         phone: '316-555-1212',
         primary: false,
      },
      {
         id: 3,
         name: 'Sarah Truman',
         address: '100 Airport Road, Hutchinson, KS',
         phone: '316-555-1212',
         primary: false,
      },
   ];

  constructor() { }

  ngOnInit(): void {
  }

}
