import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPhoneAddressComponent } from './contact-phone-address.component';

describe('ContactPhoneAddressComponent', () => {
  let component: ContactPhoneAddressComponent;
  let fixture: ComponentFixture<ContactPhoneAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPhoneAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPhoneAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
