import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {find} from 'lodash-es';
import {AuthService} from '../../../../../core/auth.service';
import {Contact} from '../../../../models/dtos';
import {AuditStatus} from '../../../../models/interfaces/dtos_additions';
import {AuditMessageSelectService} from '../../../../services/audit-message-select.service';
import {AuditService} from '../../../../services/audit.service';

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent implements OnInit {
  message = 'The contact is not correct.';
  label = 'Contact Here';
  @Input() contactsFormArray: FormArray;
  @Input() ncms_id: string;
  @Input() module: string;
  @Input() section: string;
  @Input() field_name: string;
  @Input() contact: Contact;
  @Input() auditAllForm: any;

  @Output() edit = new EventEmitter();
  @Output() delete: EventEmitter<Contact> = new EventEmitter<Contact>();

  @ViewChild('confirmDialog') confirmDialog: ElementRef;

  auditForm: FormGroup;
  contactValue: Contact;
  // showDeleteConfirm = false;
  statusIcon: string;

  constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder, private authService: AuthService,
              private auditMessageSelectService: AuditMessageSelectService, private auditService: AuditService) {
  }

  ngOnInit(): void {
    this.auditAllForm.valueChanges.subscribe(() => {
      const statusIcon = this.getStatusIcon();
      if (this.statusIcon !== statusIcon) {
        this.statusIcon = statusIcon;
        this.changeDetector.detectChanges();
      }
    });
  }

  public handleEditContact() {
    this.edit.emit(true);
  }

  // public handleConfirm() {
  //    this.showDeleteConfirm = true;
  //    const myModalEl = document.getElementById('confirm-delete');
  //    const modal = Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance
  //
  //    modal.show();
  // }

  public async handleDeleteContact() {
    this.delete.emit(this.contact);
  }

  public getStatusIcon() {
    const filteredValues = this.auditService.findFieldsForRecord(this.ncms_id, this.module, this.section,
      this.contact.id, this.auditAllForm.value);

    if (filteredValues?.length > 0) {
      let hasPendingStatus = false;
      let hasPassed = false;

      for (const auditValue of filteredValues) {
        if (auditValue.status === AuditStatus.NEEDS_ATTENTION) {
          return 'assets/img/home/alert-triangle-fill-small.svg';
        } else if (auditValue.status === AuditStatus.PENDING_REVIEW) {
          hasPendingStatus = true;
        } else if (auditValue.status === AuditStatus.PASSED) {
          hasPassed = true;
        }
      }

      return hasPendingStatus ?
        'assets/img/home/clock-fill.svg' :
        (hasPassed ? 'assets/img/home/star-no-fill-small.svg' : undefined);
    }
  }

  public getContact(): Contact {
    return find(this.contactsFormArray.value, {id: this.contact?.id}) || this.contact;
  }
}
