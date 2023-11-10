import {Injectable} from '@angular/core';
import {
   AuditMessage, AuditMessageTemplate, FindAuditMessage, FindAuditMessageTemplate, QueryResponse, User
} from '../models/dtos';
import {DataService} from './data.service';
import {AuditStatus} from '../models/interfaces/dtos_additions';
import {filter} from 'lodash-es';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
   providedIn: 'root'
})
/**
 * Service for auditing a form.
 */
export class AuditService {
   private ncms_id;
   private needsAttentionMessages: any = {};
   private pendingMessages: any = {};
   private isSentToContractor: any = {};

   constructor(private dataService: DataService) {
   }

   /**
    * Determines if the notification is sent for the list of audit messages.
    * @param auditMessages The audit messages to check.
    * @private
    */
   private static isSent(auditMessages: AuditMessage[]) {
      for (const auditMessage of auditMessages) {
         if (auditMessage?.notification_status !== 'sent') {
            return false;
         }
      }
      return true;
   }

   /**
    * Loads the Needs Attention Audit messages.
    *
    * @param ncms_id The NCMS ID for the audit messages.
    * @param module  The module for the audit messages.
    * @param reset Indicates if the audit messages should be loaded even if they are already loaded.
    */
   public async loadNeedsAttentionMessages(ncms_id: string, module: string, reset = false): Promise<void> {
      if (reset || (ncms_id && module && (ncms_id !== this.ncms_id || !this.needsAttentionMessages[module]))) {
         const needsAttentionMessages = await this.dataService.getClient()
            .get<QueryResponse<AuditMessage>>(new FindAuditMessage(),
               {module, status: AuditStatus.NEEDS_ATTENTION});

         this.ncms_id = ncms_id;
         this.needsAttentionMessages[module] = needsAttentionMessages?.results || [];
         this.isSentToContractor[module] = false;
      } else if (!ncms_id || !module) {
         console.log('Could not load needs attentions messages', ncms_id, module);
         return Promise.resolve();
      }
   }

   /**
    * Loads the Pending Audit messages.
    *
    * @param ncms_id The NCMS ID for the audit messages.
    * @param module  The module for the audit messages.
    * @param reset Indicates if the audit messages should be loaded even if they are already loaded.
    */
   public async loadPendingMessages(ncms_id: string, module: string, reset = false) {
      if (reset || (ncms_id && module && (ncms_id !== this.ncms_id || !this.pendingMessages?.[module]))) {
         const pendingMessages = await this.dataService.getClient()
            .get<QueryResponse<AuditMessage>>(new FindAuditMessage(),
               {module, status: AuditStatus.PENDING_REVIEW});
         this.pendingMessages[module] = pendingMessages?.results || [];
         this.isSentToContractor[module] = false;
      } else if (!ncms_id || !module) {
         console.log('Could not load pending messages', ncms_id, module);
         return Promise.resolve();
      }
   }

   /**
    * Indicates if the Notification has been sent for all the audit messages for the module.
    * @param module_id The id of the module.
    * @return True if the notifications have been sent.
    */
   public isNotificationSent(module_id: string) {
      if (this.needsAttentionMessages?.[module_id]?.length > 0 || this.pendingMessages[module_id]?.length > 0) {
         this.isSentToContractor[module_id] =
            AuditService.isSent(this.needsAttentionMessages[module_id]) && AuditService.isSent(this.pendingMessages[module_id]);
      }
      return this.isSentToContractor[module_id];
   }

   /**
    * Fetch the Message templates for the module.
    *
    * @param moduleId The module ID for the module.
    */
   public async fetchMessageTemplates(moduleId: string): Promise<QueryResponse<AuditMessageTemplate>> {
      return await this.dataService.getClient()
         .get<QueryResponse<AuditMessageTemplate>>(new FindAuditMessageTemplate(), {moduleId});
   }

   /**
    * Get the Needs attention audit messages. They will be fetched from the server if needed.
    *
    * @param ncms_id The NCMS ID for the attention messages.
    * @param module The module of the audit messages.
    */
   public async getNeedsAttentionMessages(ncms_id: string, module: string) {

      if (!this.needsAttentionMessages?.[module]) {
         await this.loadNeedsAttentionMessages(ncms_id, module);
      }

      return this.needsAttentionMessages[module];
   }

   /**
    * Get the pending review audit messages.
    * @param ncms_id The NCMS ID for the attention messages.
    * @param module
    */
   public async getPendingMessages(ncms_id: string, module: string) {

      if (!this.pendingMessages[module]) {
         await this.loadPendingMessages(ncms_id, module);
      }

      return this.pendingMessages[module];
   }

   /**
    * Get the path for the module, section and field.
    *
    * @param auditMessage The message for which to get the path.
    */
   getPath(auditMessage: AuditMessage) {
      return auditMessage?.field_id.split('.');
   }

   /**
    * Get the section from an audit message.
    * @param auditMessage the audit message for which to get the section.
    */
   getSection(auditMessage: AuditMessage) {
      const [/*unused*/, section] = this.getPath(auditMessage);
      return section;
   }

   /**
    * Get the field from the audit message.
    * @param auditMessage the audit message for which to get the field.
    */
   getField(auditMessage: AuditMessage) {
      const [/*unused*/, /*unused*/, field] = this.getPath(auditMessage);
      return field;
   }

   /**
    * Checks if the audit message is from the given section.
    * @param auditMessage the audit message to check.
    * @param section the section to check for.
    */
   isSection(auditMessage: AuditMessage, section: string) {
      return this.getSection(auditMessage) === section;
   }

   /**
    * Checks if the audit message is from the given section.
    * @param auditMessage the audit message to check.
    * @param section the section to check for.
    * @param [field] The field of the
    */
   isSectionField(auditMessage: AuditMessage, section: string, field?: string) {
      const [/*unused*/, sectionProperty, fieldProperty] = this.getPath(auditMessage);
      return sectionProperty === section && (!field || fieldProperty === field);
   }

   /**
    * Checks if the audit message is from the given field.
    * @param auditMessage the audit message to check.
    * @param field the field to check for.
    */
   isField(auditMessage: AuditMessage, field: string) {
      return this.getField(auditMessage) === field;
   }

   /**
    * Find all the audit messages for the section.
    * @param ncms_id The NCMS ID for the audit messages.
    * @param module The module for the audit messages.
    * @param section The section for the audit messages.
    * @param auditMessages The audit messages for the section.
    */
   public findSectionAuditMessage(ncms_id: string, module: string, section: string, auditMessages?: AuditMessage[]): AuditMessage[] {

      if (ncms_id && module && section) {
         if (auditMessages) {
            return <AuditMessage[]>auditMessages?.filter(auditMessage => this.isSection(auditMessage, section));
         } else {
            const needsAttentionModule = this.needsAttentionMessages[module];
            const needsAttentionSection = <AuditMessage[]>needsAttentionModule?.filter(
               auditMessage => this.isSection(auditMessage, section));

            const pendingModule = this.pendingMessages[module];
            const pendingSection = <AuditMessage[]>pendingModule.filter(auditMessage => {
               const [/*module*/, messageSection] = auditMessage.field_id.split('.');
               return messageSection === section;
            });

            return [...needsAttentionSection, ...pendingSection];
         }
      }
      return [];
   }

   /**
    * Find all the audit messages for the section and field.
    * @param ncms_id The NCMS ID for the audit messages.
    * @param module The module for the audit messages.
    * @param section The section for the audit messages.
    * @param field The field for the audit messages.
    * @param auditMessages The audit messages for the section.
    */
   public findSectionFieldAuditMessage(ncms_id: string, module: string, section: string, field: string,
      auditMessages?: AuditMessage[]): AuditMessage[] {

      if (ncms_id && module && section) {
         if (auditMessages) {
            return <AuditMessage[]>auditMessages?.filter(auditMessage => this.isSectionField(auditMessage, section, field));
         } else {
            const needsAttentionModule = this.needsAttentionMessages[module];
            const needsAttentionSection = <AuditMessage[]>needsAttentionModule?.filter(
               auditMessage => this.isSectionField(auditMessage, section, field));

            const pendingModule = this.pendingMessages[module];
            const pendingSection = <AuditMessage[]>pendingModule.filter(
               auditMessage => this.isSectionField(auditMessage, section, field));

            return [...needsAttentionSection, ...pendingSection];
         }
      }
      return [];
   }

   /**
    * Get all the audit messages for the field.
    *
    * @param auditMessages The list of audit messages in which to find the field audit messages.
    * @param field The field name to for the audit messages.
    */
   public getFieldAuditMessages(auditMessages: AuditMessage[], field: string) {
      return auditMessages?.filter(auditMessage => this.isField(auditMessage, field));
   }

   /**
    * Create a field_id from the module, section, field and record.
    * @param module The module for the field ID.
    * @param section The section for the field ID.
    * @param field_name The name for the field ID.
    * @param [record_id] The record ID for the field ID.
    */
   public getFieldId(module: string, section: string, field_name: string, record_id?: string): string {
      let field_id = `${module}.${section}.${field_name}`;

      if (record_id) {
         field_id += '.' + record_id;
      }
      return field_id;
   }

   /**
    * Find the audit message for the give NCMS ID and field_id.
    *
    * @param ncms_id The NCMS ID for the audit message.
    * @param field_id The field_id of the audit message.
    */
   public findFieldAuditMessage(ncms_id: string, field_id: string): AuditMessage {
      const [module] = field_id.split('.');

      const messages = [...(this.needsAttentionMessages[module] || []), ...(this.pendingMessages[module] || [])];
      return filter(messages, {field_id: field_id})?.[0] || {};
   }

   /**
    * Finds the audit messages for the ncms_id, module, section, and record. The field is not specified because all the
    * fields are returned for this record. For example if the section is Contact and the record is 1, then all the
    * fields for the contact in the first record will be returned.
    *
    * @param ncms_id The NCMS ID for the audit messages.
    * @param module The module for the audit messages.
    * @param section The section for the audit messages.
    * @param record The record id for the audit messages.
    * @param auditMessages All the audit messages for the record.
    */
   public findFieldsForRecord(ncms_id: string, module: string, section: string, record: number,
      auditMessages?: AuditMessage[]): AuditMessage[] {
      const sectionAuditMessages = this.findSectionAuditMessage(ncms_id, module, section, auditMessages);

      return filter(sectionAuditMessages, message => {
         const [/*module*/, /*section*/, /*field*/, recordForMessage] = message.field_id.split('.');
         return record?.toString() === recordForMessage;
      });
   }

   /**
    * Create a FormGroup for an audit message.
    *
    * @param formBuilder The formBuilder to use to create the audit message form group.
    * @param auditMessage The audit message for the form group.
    * @param defaultAuditMessage The default audit message. Used to default fields not in the auditMessage.
    * @param user The user creating the audit message.
    */
   public createAuditMessageForm(formBuilder: FormBuilder, auditMessage: AuditMessage,
      defaultAuditMessage: any, user?: User): FormGroup {
      let field_id = auditMessage?.field_id;

      if (!field_id) {
         field_id =
            this.getFieldId(defaultAuditMessage?.module, defaultAuditMessage?.section, defaultAuditMessage?.field_name,
               defaultAuditMessage?.record_id);
      }

      return formBuilder.group({
         id: [auditMessage?.id || 0],
         field_name: [auditMessage?.field_name || defaultAuditMessage?.label],
         field_id: [field_id],
         status: [auditMessage?.status || defaultAuditMessage?.status],
         module: [auditMessage?.module || defaultAuditMessage?.module],
         object_name: [auditMessage?.object_name || defaultAuditMessage?.object_name],
         object_field: [auditMessage?.object_field || defaultAuditMessage?.object_field],
         ncms_id: [auditMessage?.ncms_id || defaultAuditMessage?.ncms_id],
         created_by: [auditMessage?.created_by || user?.name],
         created_date: [auditMessage?.created_date || new Date()],
         message_text: [auditMessage?.message_text || defaultAuditMessage?.message_text],
         comments: [auditMessage?.comments],
         notification_status: [auditMessage?.notification_status],
         commentList: formBuilder.array([])
      });
   }

   /**
    * Get the AuditStatus for the FormArray of audit messages.
    *
    * @param auditFormArray The audit form array for which to get the auditStatus.
    */
   public getAuditStatus(auditFormArray: FormArray): AuditStatus {

      if (auditFormArray) {
         const auditList = auditFormArray.getRawValue();
         let hasPendingStatus = false;
         let hasPassed = false;

         for (const audit of auditList) {
            if (audit.status === AuditStatus.NEEDS_ATTENTION) {
               return AuditStatus.NEEDS_ATTENTION;
            } else if (audit.status === AuditStatus.PENDING_REVIEW) {
               hasPendingStatus = true;
            } else if (audit.status === AuditStatus.PASSED) {
               hasPassed = true;
            }
         }

         return hasPendingStatus ? AuditStatus.PENDING_REVIEW : (hasPassed ? AuditStatus.PASSED : undefined);
      }
   }
}
