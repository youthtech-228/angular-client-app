import {
   Component, ElementRef, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../../../models/dtos';

@Component({
   selector: 'app-contact-edit',
   templateUrl: './contact-edit.component.html',
   styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
   section = 'contact';
   @Input() ncms_id: string;
   @Input() contact: Contact;
   @Input() module: string;
   @Input() auditAllForm: any;
   @Input() contactsFormArray: FormArray;
   @Output() close = new EventEmitter();

   public contactForm: FormGroup;
   isNew: Boolean;

   constructor(private eRef: ElementRef, private formBuilder: FormBuilder) {
   }

   ngOnInit(): void {
      this.isNew = !this.contact?.id;

      this.contactForm = this.formBuilder.group({
         id: [this.contact?.id],
         ncms_id: [this.contact?.ncms_id],
         name: [this.contact?.name, Validators.required],
         phone: [this.contact?.phone],
         email: [this.contact?.email],
         // TODO email: [this.contact?.email, Validators.required],
         primary: [this.contact?.primary, Validators.required],
      });

      this.contactsFormArray.push(this.contactForm);
   }

   public onClose() {
      this.close.emit();
   }

   public isValid() {
      return this.contactForm.valid;
   }
}
