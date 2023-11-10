import {
   ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
   SimpleChanges, ViewChild
} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuthService} from '../../../core/auth.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {
   AuditMessage, AuditMessageTemplate, FindAuditMessageComment
} from '../../models/dtos';
import {JsonClientService} from '../../services/json-client.service';
import {NotificationStyledService} from '../../services/notification-styled.service';
import {AuditService} from '../../services/audit.service';
import {MESSAGE_FIELD} from '../message-panel/message-panel.component';

/**
 * The component to display a single message with comments.
 */
@Component({
   selector: 'app-message',
   templateUrl: './message.component.html',
   styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {
   eAuditStatus = AuditStatus;
   @Input() auditForm: FormGroup;
   @Input() replyRequired: boolean;
   @Input() messageTemplates: AuditMessageTemplate[] = [];
   @Input() auditMessage: AuditMessage;

   @Output() delete: EventEmitter<AuditMessage> = new EventEmitter<AuditMessage>();

   @ViewChild('messageInput') messageInput: ElementRef;

   commentListForm: FormArray;
   public isEditing = false;
   hasFocus = false;

   @HostListener('document:click', ['$event'])
   clickAway(event) {
      // Must already have focus or the original click of the reply button will turn off editing.
      if (this.hasFocus && !this.eRef.nativeElement.contains(event.target)) {
         this.isEditing = false;
      }
   }

   constructor(private changeDetector: ChangeDetectorRef, private eRef: ElementRef, private formBuilder: FormBuilder,
      private authService: AuthService, private dataService: DataService, private jsonService: JsonClientService,
      private auditService: AuditService, private notificationStyledService: NotificationStyledService) {
   }

   /**
    * On init create the form array for the comments for this message. Initialize the array with existing comments.
    */
   async ngOnInit(): Promise<void> {
      this.commentListForm = <FormArray>this.auditForm.get('commentList');

      if (this.auditForm.value.id > 0) {
         try {
            const results = await this.dataService.getClient()
               .get(new FindAuditMessageComment(), {audit_message_id: this.auditForm.value.id});
            for (const comment of results.results) {
               this.initializeCommentForm(comment);
            }
         } catch (e) {
            console.log(e);
            this.notificationStyledService.showError({content: 'Could not load message comments.'});
         }
      }

      if (!this.auditForm.value.message_text && this.messageTemplates?.length > 0) {
         this.auditForm.patchValue({message_text: this.messageTemplates[0]?.name});
      }

      this.handleStartEditing(this.auditForm.value.id === 0 && !this.auditForm.value.message_text);
   }

   getValue(): AuditMessage {
      return this.auditForm?.value || this.auditMessage || {};
   }

   /**
    * Initialize the comment form from the comment.
    * @param comment The comment to use to initialize the comment form.
    */
   initializeCommentForm(comment) {
      const commentForm = this.formBuilder.group({
         id: [comment?.id || 0],
         audit_message_id: [comment?.audit_message_id],
         text: [comment?.text, this.replyRequired ? Validators.required : undefined],
         created_date: [comment?.created_date || new Date()],
         created_by: [comment?.created_by || (this.authService.getUser()?.name || this.authService.getUser()?.username)],
         ncms_id: [comment?.ncms_id],
      });

      this.commentListForm.push(commentForm);
   }

   /**
    * Handle clicking the audit item as passed.
    *
    * NOTE: The user must be an auditor.
    */
   public handlePassClick() {
      if (this.authService.isAuditor()) {
         this.auditForm.patchValue({status: AuditStatus.PASSED});
         // Angular doesn't mark dirty when it should. Change it explicitly.
         this.auditForm.markAsDirty();
      }
   }

   public handlePendingClick() {
      if (!this.authService.isAuditor()) {
         const status = this.getValue().status;

         if (status === AuditStatus.PENDING_REVIEW) {
            this.auditForm.patchValue({status: AuditStatus.PENDING_REVIEW});
         } else {
            this.auditForm.patchValue({status: AuditStatus.NEEDS_ATTENTION});
         }

         // Angular doesn't mark dirty when it should. Change it explicitly.
         this.auditForm.markAsDirty();
      }
   }

   /**
    * Handle adding a new comment.
    */
   public handleAddNewComment() {
      this.initializeCommentForm({});
   }

   /**
    * Handle stop editing. If the comment is empty delete it.
    */
   public handleEndEditing() {
      this.isEditing = false;
      this.hasFocus = false;
      this.changeDetector.detectChanges();
   }

   public async handleDelete() {
      this.auditForm.patchValue({status: undefined});
      this.delete.emit(this.getValue());
   }

   public isUserNcms() {
      return this.authService.isAuditor();
   }

   /**
    * Is the message inactive. Auditors marking a message passed will be inactive. Contractors marking a message
    * pending review will be inactive.
    */
   public isMessageInactive() {
      const status = this.getValue().status;

      if (status) {
         return this.authService.isAuditor() ? status === AuditStatus.PASSED : status === AuditStatus.PENDING_REVIEW;
      } else {
         return false;
      }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      if (changes?.replyRequired?.currentValue === true) {
         this.handleAddNewComment();
      }
   }

   public handleChangeTemplate(messageTemplate: AuditMessageTemplate) {
      this.auditForm.patchValue({message_text: messageTemplate.name});
      this.auditForm.markAsDirty();
      this.changeDetector.detectChanges();
   }

   public handleStartEditing(isEditing) {
      if (isEditing && this.authService.isAuditor()) {
         // The component will start in the editing mode if the message is new and it has no text.
         this.isEditing = isEditing;
         this.changeDetector.detectChanges();

         // Set focus on the input if editing.
         if (this.isEditing) {
            setTimeout(() => {
               this.messageInput.nativeElement.focus();
               this.hasFocus = true;
            }, 10);
         }
      }
   }

   public isAuditor() {
      return this.authService.isAuditor();
   }

   public isShowMessagePending() {
      return !this.authService.isAuditor() && this.auditService.getField(this.getValue()) === MESSAGE_FIELD;
   }
}
