import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Contact, FindContact, StoreContact, UpdateContact} from '../../../models/dtos';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {JsonClientService} from '../../../services/json-client.service';
import {AuditStatus} from '../../../models/interfaces/dtos_additions';
import {NotificationStyledService} from '../../../services/notification-styled.service';
import {AuditService} from '../../../services/audit.service';
import {DataService} from '../../../services/data.service';
import {pullAllBy} from 'lodash-es';

@Component({
   selector: 'app-contacts',
   templateUrl: './contacts.component.html',
   styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, AfterContentInit {
   section = 'contact';
   @Input() status = AuditStatus.PASSED;
   @Input() ncms_id: string;
   @Input() module: string;
   @Input() message: string;
   @Input() field_name: string;
   @Input() allForms: FormGroup;
   contactsAllForm: FormGroup = new FormGroup({});
   contactsFormArray: FormArray;
   auditAllForm: FormArray;
   contacts: Contact[];
   auditStatus: AuditStatus;

   constructor(private formBuilder: FormBuilder, private jsonService: JsonClientService,
      private notificationStyledService: NotificationStyledService, private auditService: AuditService,
      private dataService: DataService) {

      try {
         this.dataService.getClient().get(new FindContact()).then((results) => {
            this.contacts = results?.results;
         });
      } catch (e) {
         console.log(e);
         this.notificationStyledService.showError({content: 'Could not load the audit message.'});
      }

   }

   ngOnInit() {
      this.contactsFormArray = this.formBuilder.array([]);
      this.contactsAllForm.addControl('contactsAllForm', this.contactsFormArray);

      this.auditAllForm = this.formBuilder.array([]);

      this.allForms.addControl('contactAuditForms', this.auditAllForm);
      this.allForms.addControl('contactEditForms', this.contactsAllForm);
   }

   public async save() {
      if (this.contactsFormArray?.dirty) {
         const controls = this.contactsFormArray.controls;
         for (const contactsForm of controls) {
            await this.saveContact(contactsForm);
         }
      }
      await this.dataService.updateAuditMessages(this.auditAllForm);
   }

   public async saveContact(contactForm: AbstractControl) {
      if (contactForm?.dirty) {
         let result;
         try {
            if (contactForm.value) {
               if (contactForm.value?.id) {
                  result = await this.dataService.getClient().post(new StoreContact(contactForm.value));
               } else {
                  result = await this.dataService.getClient().put(new UpdateContact(contactForm.value));
               }
               contactForm.reset(result);
            }
            contactForm.markAsPristine();
         } catch (e) {
            console.log(e);
            this.notificationStyledService.showError({content: 'Could not load the audit message.'});
         }
      }
   }

   /**
    * Handle adding a contact.
    */
   public handleAddContact() {
      // Create a unique ID based on the milliseconds since January 1, 1970
      this.contacts.push(new Contact({id: Date.now(), primary: false, ncms_id: this.ncms_id}));
   }

   /**
    * Handle deleting a contact.
    */
   public handleDeleteContact(contact: Contact) {
      pullAllBy(this.contacts, [contact], 'id');
   }

   public isValid() {
      return this.contactsAllForm.valid;
   }

   public ngAfterContentInit(): void {
      this.auditStatus = this.auditService.getAuditStatus(this.auditAllForm);
   }
}
