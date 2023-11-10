import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListAddressPhoneComponent } from './contact-list-address-phone.component';

describe('ContactListAddressPhoneComponent', () => {
  let component: ContactListAddressPhoneComponent;
  let fixture: ComponentFixture<ContactListAddressPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListAddressPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListAddressPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
