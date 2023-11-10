import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuditMessage, Contact} from '../../../../models/dtos';
import {FormArray, FormBuilder} from '@angular/forms';
import {AuditService} from '../../../../services/audit.service';
import {ContactEditComponent} from '../contactEdit/contact-edit.component';

@Component({
   selector: 'app-contact',
   templateUrl: './contact.component.html',
   styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
   @Input() ncms_id: string;
   @Input() module: string;
   @Input() section: string;
   @Input() contact: Contact;
   @Input() contactsFormArray: FormArray;
   @Input() auditAllForm: any;
   @Output() delete: EventEmitter<Contact> = new EventEmitter<Contact>();

   @ViewChild('editContact') editContact: ContactEditComponent;
   isEdit = false;
   auditMessages: AuditMessage[];

   constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder, private auditService: AuditService) {
   }

   ngOnInit(): void {
      this.auditMessages = this.auditService.findSectionAuditMessage(this.ncms_id, this.module, this.section);

      this.isEdit = !this.contact?.name;
   }

   public handleEditContact() {
      this.isEdit = true;
      this.changeDetector.detectChanges();
   }

   public handleCloseEdit() {

      if (this.editContact.isValid()) {
         this.isEdit = false;
         this.changeDetector.detectChanges();
      }
   }

   public handleDeleteContact() {
      this.delete.emit(this.contact);
   }
}
