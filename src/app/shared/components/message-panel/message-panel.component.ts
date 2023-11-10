import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder} from '@angular/forms';
import {
   AuditMessage, AuditMessageTemplate, FindAuditMessage, QueryResponse, User
} from '../../models/dtos';
import {JsonClientService} from '../../services/json-client.service';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuthService} from '../../../core/auth.service';
import {DataService} from '../../services/data.service';
import {NotificationStyledService} from '../../services/notification-styled.service';
import {AuditService} from '../../services/audit.service';
import {AuditMessageSelectService} from '../../services/audit-message-select.service';
import {findIndex, filter} from 'lodash-es';

// Field name for messages not associated with an actual field.
export const MESSAGE_FIELD = 'messages';

/**
 * Sort the AuditMessages. Sorts status by Needs Attention, Pending Review, and Passed. Within the status they are
 * sorted by date.
 *
 * @param message1 First audit message to compare.
 * @param message2 Second audit message to cmopare
 * @Return 0 - equal; 1 - message1 > message2; -1 message1 < message2.
 */
const sortAuditMessage = (message1: AuditMessage | AbstractControl, message2: AuditMessage | AbstractControl) => {
   if (message1 === message2) {
      return 0;
   }
   if (message1 === undefined || message2 === undefined) {
      return (message1 === undefined) ? -1 : 1;
   }

   const auditMessage1 = message1 instanceof AbstractControl ? message1.value : message1;
   const auditMessage2 = message2 instanceof AbstractControl ? message2.value : message2;

   if (auditMessage1.id === auditMessage2.id) {
      return 0;
   }

   if (auditMessage1.status === auditMessage2.status) {
      return auditMessage1.create_by > auditMessage2.create_by ? 1 : -1;
   } else {
      switch (auditMessage1.status) {
         case AuditStatus.NEEDS_ATTENTION:
            return -1;
         case AuditStatus.PENDING_REVIEW:
            return auditMessage2.status === AuditStatus.NEEDS_ATTENTION ? 1 : -1;
         case AuditStatus.PASSED:
            return 1;
         default:
            console.log('AuditStatus is not known.', auditMessage1.status);
            return 1;
      }
   }
};

/**
 * Component to show list of AuditMessages.
 */
@Component({
   selector: 'app-message-panel',
   templateUrl: './message-panel.component.html',
   styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {
   messageSection = 'companyMessage';
   @Input() ncms_id: string;
   @Input() auditAllForm: FormArray;
   @Input() module: string;
   @Input() section = 'companyMessage';

   auditMessages: AuditMessage[] = [];
   archiveAuditMessages: AuditMessage[];
   showHistory = false;
   selectedMessageElement: Element;
   selectedFieldId: any;
   lastUpdatedFieldId: any;
   replyRequired: string;
   fetchingArchive = false;
   messageTemplates: AuditMessageTemplate[] = [];
   messageField = MESSAGE_FIELD;

   constructor(
      private formBuilder: FormBuilder,
      private jsonService: JsonClientService,
      private authService: AuthService,
      private dataService: DataService,
      private notificationStyledService: NotificationStyledService,
      private auditService: AuditService,
      private changeDetector: ChangeDetectorRef,
      private auditMessageSelect: AuditMessageSelectService) {

      // Update the selected audit message field_id.
      auditMessageSelect.subscribe(({field_id, replyRequired}) => {
         // The message panel needs to be showing the message controls before trying to scroll and select.
         setTimeout(() => {
            this.selectedFieldId = field_id;
            this.replyRequired = replyRequired && field_id;
            }, 2);
      });
   }

   async ngOnInit(): Promise<void> {
      this.auditMessages = this.auditService.findSectionFieldAuditMessage(this.ncms_id, this.module, this.section, this.messageField);

      for (const auditMessage of this.auditMessages) {
         const auditForm =
            this.auditService.createAuditMessageForm(this.formBuilder, auditMessage, {
               ncms_id: this.ncms_id, module: this.module,
               section: this.section
            });

         this.auditAllForm.push(auditForm);
      }

      if (this.isAuditor()) {
         await this.auditService.fetchMessageTemplates(this.module).then(result => {
            this.messageTemplates = result.results;
         });
      }
   }

   /**
    * Update the selected audit message. The 'select' class is added/removed when the audit message is
    * selected/unselected.
    *
    * @param list List of audit messages.
    */
   updateSelect(list: (AbstractControl | AuditMessage)[]) {
      if (this.lastUpdatedFieldId !== this.selectedFieldId) {
         this.lastUpdatedFieldId = this.selectedFieldId;
         this.selectedMessageElement?.classList.remove('selected');
         this.selectedMessageElement = undefined;

         // Find the selected audit message basedo n the field_id.
         const selectedIndex = findIndex(list, messageControl => {
            if (messageControl instanceof AbstractControl) {
               return messageControl?.value?.field_id === this.selectedFieldId;
            } else {
               return messageControl?.field_id === this.selectedFieldId;
            }
         });

         // If the selected element was found...
         if (selectedIndex >= 0) {
            const messageListElement = document.getElementById('messageListId' + this.section);

            if (messageListElement) {
               this.selectedMessageElement = messageListElement.children[selectedIndex];
               this.selectedMessageElement?.classList.add('selected');
               // Calculate the height of each message component.
               const messageElHeight = messageListElement.scrollHeight / list.length;
               // Calculate the offset from the top of the list to the bottom of the message component.
               const offset = messageElHeight * selectedIndex;
               // Scroll the message to the element. Go back half the message height to put it in the middle.
               messageListElement.scrollTop = offset - (messageElHeight / 2);
            }
         } else {
            console.log('Element was not found for selected field_id.', this.selectedFieldId);
         }
      }
   }

   getMessages() {
      const messages = (this.auditAllForm?.controls?.filter(auditMessageControl => {
            const [/*module*/, section, /*field_name*/] = auditMessageControl.value.field_id.split('.');
            return (this.section === section) && auditMessageControl.value.status;
         }) || []);

      if (messages.length >= 1) {
         const sortedMessages = messages.sort(sortAuditMessage);
         this.updateSelect(sortedMessages);
         return sortedMessages;
      }
      return undefined;
   }

   async handleShowHistory(showHistory: boolean) {
      this.showHistory = showHistory;

      if (showHistory && this.archiveAuditMessages === undefined) {
         try {
            this.fetchingArchive = true;
            const result = await this.dataService.getClient().get<QueryResponse<AuditMessage>>(new FindAuditMessage(),
               {ncms_id: this.ncms_id, module: this.module, section: this.section, status: 'passed'});
            // @ts-ignore
            this.archiveAuditMessages =
               this.auditService.findSectionFieldAuditMessage(this.ncms_id, this.module, this.section, undefined,
                  result.results);
            this.fetchingArchive = false;
            this.changeDetector.detectChanges();
         } catch (e) {
            this.fetchingArchive = false;
            console.log(e);
            this.notificationStyledService.showError({content: 'Could not load the message history.'});
         }
      } else {
         this.changeDetector.detectChanges();
      }
   }

   public addMessage() {
      this.showHistory = false;
      const user: User = this.authService.getUser();
      const auditForm = this.auditService.createAuditMessageForm(this.formBuilder, undefined, {
         ncms_id: this.ncms_id,
         module: this.module,
         section: this.section,
         field_name: this.messageField,
         status: AuditStatus.NEEDS_ATTENTION
      }, user);
      this.auditAllForm.push(auditForm);
   }

   public isAuditor() {
      return this.authService.isAuditor();
   }

   public getIsReplyRequired(control): boolean {
      return this.replyRequired === control?.value?.field_id;
   }

   public getMessageTemplates(control) {
      const fieldId = control?.value?.field_id;
      if (fieldId && this.messageTemplates?.length > 0) {
         return filter(this.messageTemplates, {fieldId});
      } else {
         return [];
      }
   }

   // public handleDelete(auditMessage) {
   //    if (auditMessage) {
   //       const messageIndex = (this.auditAllForm?.controls?.findIndex(auditMessageControl => {
   //          const [/*module*/, section, /*field_name*/] = auditMessageControl.value.field_id.split('.');
   //          return auditMessageControl?.value?.id === auditMessage?.id && this.section === section && auditMessageControl.value.status;
   //       }) || []);
   //
   //       // const messageIndex = findIndex(this.auditAllForm?.controls, message => message?.value?.id === auditMessage?.id);
   //       if (messageIndex >= 0) {
   //          debugger;
   //          const deletedControl = this.auditAllForm.at(+messageIndex);
   //          deletedControl.patchValue({status: undefined});
   //          this.auditAllForm.removeAt(+messageIndex);
   //          // this.changeDetector.detectChanges();
   //       }
   //    }
   // }
}
