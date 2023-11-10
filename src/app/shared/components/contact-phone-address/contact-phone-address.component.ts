import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-phone-address',
  templateUrl: './contact-phone-address.component.html',
  styleUrls: ['./contact-phone-address.component.scss']
})
export class ContactPhoneAddressComponent implements OnInit {
   @Input() contact: any;
   @Input() title: any;
   @Input() parentForm: FormGroup;
   @Input() elementRef: string;
   @Input() section: string;
   @Input() ncms_id: string | undefined;
   @Input() module:string;
   contactForm: FormGroup = new FormGroup({});
   constructor(private builder: FormBuilder, private router: Router) {}

   ngOnInit(): void {
      this.contactForm = this.getFormGroup(this.contact);
      this.parentForm.addControl(this.elementRef || "contactForm", this.contactForm);
   }
   updateContactData(contact){
      
      this.contactForm = this.getFormGroup( contact );//new FormGroup(formParam);
   }
   getFormGroup(contact)
   {
      let formParam = {}
      formParam[ 'name' + this.elementRef ] = [contact.name, Validators.required]
      formParam[ 'phone' + this.elementRef ] = [contact.phone, Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}$')]
      formParam[ 'address' + this.elementRef ] = [contact.address, Validators.required]

      return this.builder.group(formParam);
   }
   syncForm()
   {
      this.parentForm.removeControl(this.elementRef || "contactForm")
      this.parentForm.addControl(this.elementRef || "contactForm", this.contactForm);
   }
   public isValid() {
      return this.contactForm.valid;
   }
   saveContact(value): void {
      console.info(value,'child submit')
   }
}
