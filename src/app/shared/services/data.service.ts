import {Inject, Injectable, TemplateRef} from '@angular/core';
import {
   AuditMessage,
   AuditMessageComment,
   StoreAuditMessageComment,
   FindFile,
   FindEmployeeValidation,
   PatchEmployee,
   FindEmployee,
   GetEmployeeValidationFiles,
   StoreEmployee,
   UpdateAuditMessage,
   FindModelPlan,
   StoreModelPlan,
   FindCoveredPosition,
   StoreCoveredPosition,
   UpdateAuditMessageComment,
   StoreAuditMessage,
   FindReturnToDuty,
   StoreReturnToDuty,
   UpdateReturnToDuty,
   GetHelpContentByModule,
   StoreHelpContentVersion,
   UpdateHelpContentVersion,
   GetUser,
   FindRoles,
   PostAddRoleToUser,
   DeleteRoleFromUser,
   GetRole,
   PutRole,
} from '../models/dtos';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormArray, FormGroup} from '@angular/forms';
import filter from 'lodash-es/filter';
import {JsonServiceClient} from '@servicestack/client';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {NotificationRef} from '@progress/kendo-angular-notification';
import {NotificationStyledService} from './notification-styled.service';

@Injectable({
   providedIn: 'root'
})
/**
 * Service to handle data. Provides the only JsonServiceClient that should be used. The bearerToken is setup with the
 * access token.
 */
export class DataService {
   shouldValidateValue = false;

   private notificationSaveRef: NotificationRef;
   private notificationSendRef: NotificationRef;
   private isNotificationSent: boolean;

   constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
      private authStorage: OAuthStorage, private notificationStyledService: NotificationStyledService) {
      this.client = new JsonServiceClient(this.baseUrl);
      this.client.bearerToken = this.authStorage.getItem('access_token');
   }

   client: JsonServiceClient;

   options = {responseType: 'json' as 'json'};

   /**
    * The OFFICIAL client for all API calls to the server.
    */
   getClient(): JsonServiceClient {
      return this.client;
   }

   /**
    * Update the bearer token when the access token changes through the authentication package.
    *
    * @param accessToken The new access token.
    */
   updateBearerToken(accessToken): void {
      this.client.bearerToken = accessToken;
   }

   /**
    * Update the audit messages on the server from the auditFormArray. Only updates the dirty audit messages.
    * @param auditFormArray The FormArray of the audit messages to update.
    */
   public updateAuditMessages(auditFormArray: FormArray | undefined): Promise<(AuditMessage | AuditMessageComment[])[]> {

      if (auditFormArray?.dirty) {
         const changedValues = filter(auditFormArray?.controls, {dirty: true});
         return Promise.all(changedValues.map(auditMessage => this.updateAuditMessage(<FormGroup>auditMessage)));
      }
   }

   /**
    * Should the form show validation messages.
    */
   public shouldValidate() {
      return this.shouldValidateValue;
   }

   /**
    * Set if the form should show validation messages.
    * @param shouldValidate Indicates if the form should show validation messages.
    */
   public setShouldValidate(shouldValidate) {
      this.shouldValidateValue = shouldValidate;
   }

   /**
    * Update the audit message on the server. Also update associated comments.
    * @param auditMessage
    */
   updateAuditMessage(auditMessage: FormGroup): Promise<AuditMessage | AuditMessageComment[]> {
      const commentList = <FormArray>auditMessage.get('commentList');
      const auditMessageValue = {...auditMessage.value, commentList: undefined};

      if (auditMessageValue?.id) {
         return this.getClient().put(new UpdateAuditMessage(auditMessageValue)).then(async result => {
            const result1 = await this.updateAuditMessageCommentList(commentList, result.id);
            auditMessage.markAsPristine();
            auditMessage.reset();
            return result1;
         });
      } else {
         if (auditMessageValue?.status !== undefined) {
            return this.getClient().post(new StoreAuditMessage(auditMessageValue)).then(result => {
               auditMessage.markAsPristine();
               auditMessage.reset(result);
               return this.updateAuditMessageCommentList(commentList, result.id);
            });
         } else {
            auditMessage.markAsPristine();
            setTimeout(() => {
               auditMessage.reset(auditMessage.value);
            }, 0);
         }
      }
   }

   /**
    * Update the audit message comments associated with the audit message. Only dirty comments are updated.
    * @param commentListArray comments for a audit message.
    * @param auditMessageId the ID of the associated audit message.
    */
   updateAuditMessageCommentList(commentListArray: FormArray, auditMessageId: number): Promise<AuditMessageComment[]> {
      const changedValues = filter(commentListArray.controls, {dirty: true});
      return Promise.all(changedValues.map(comment => this.updateAuditMessageComment(comment.value, auditMessageId)));
   }

   /**
    * Update the audit comment on the server.
    * @param auditMessageComment The comment to update.
    * @param audit_message_id The ID of the AuditMessage.
    */
   updateAuditMessageComment(auditMessageComment: AuditMessageComment, audit_message_id: number): Promise<AuditMessageComment> {

      if (auditMessageComment?.id) {
         return this.getClient().put(new UpdateAuditMessageComment({...auditMessageComment, audit_message_id}));
      } else {
         return this.getClient().post(new StoreAuditMessageComment({...auditMessageComment, audit_message_id}));
      }
   }

   /**
    * Get the files for the type. Type is NOT file type.
    * @param type The
    */
   getFiles(type) {
      return this.getClient().get(new FindFile(), {typeStartsWith: type});
   }

   destroyFile() {
      // return this.dataService.getClient().delete( new DeleteFile({id}))
   }

   getEmployeeValidations(param = null) {
      if (param != null) {
         return this.getClient().get(new FindEmployeeValidation());
      } else {
         return this.getClient().get(new FindEmployeeValidation(), param);
      }
   }

   getEmployees(param = null) {
      // return this.getClient().get( new FindEmployee() )
      if (param != null) {
         return this.getClient().get(new FindEmployee(), param);
      } else {
         return this.getClient().get(new FindEmployee());
      }
   }

   validateEmployee(employee) {
      return this.getClient().patch(new PatchEmployee({...employee}));
   }

   storeEmployee(employee) {
      return this.getClient().post(new StoreEmployee(employee));
   }

   getEmployeeValidationId(employeeId) {
      return this.getClient().get(new FindEmployeeValidation(employeeId));
   }

   getEmployeeValidationFiles(id) {
      return this.getClient().get(new GetEmployeeValidationFiles(id));
   }

   deleteEmployeeValidationFile(id: Number) {
      // return this.getClient().get(new DeleteEmployeeValidationFile(id));
   }

   getModelPlan(ncms_id) {
      return this.getClient().get(new FindModelPlan(), {ncms_id: ncms_id});
   }

   storeModelPlan(modelPlan) {
      return this.getClient().post(new StoreModelPlan(modelPlan));
   }

   getCoveredPosition() {
      return this.getClient().get(new FindCoveredPosition());
   }

   /**
    * Display the Save or Send notification based on the data. The Send notification can cross different screens, but
    * the save notification should not. If a user leaves the screen after the error message, the save notification should
    * be cleared.
    *
    * @param inputForm The input form to check for save.
    * @param saveTemplate The save template for the screen.
    * @param sendTemplate The send template for the screen.
    * @param isNotificationSent
    */
   saveSendNotification(inputForm: FormGroup, saveTemplate: TemplateRef<any>, sendTemplate: TemplateRef<any>, isNotificationSent: boolean) {
      if (inputForm.dirty) {
         if (!this.notificationSaveRef) {
            this.notificationSendRef?.hide();
            // this.notificationSendRef = null;
            this.notificationSaveRef = this.notificationStyledService.showWarning({content: saveTemplate});
            this.notificationSaveRef.afterHide.subscribe(() => {
               this.notificationSaveRef = null;
            });
         }
      } else {
         if (this.notificationSaveRef) {
            this.notificationSaveRef?.hide();
            // this.notificationSaveRef = null;
         }
         if (!this.isNotificationSent) {
            if (!this.notificationSendRef) {
               this.notificationSendRef = this.notificationStyledService.showWarning({content: sendTemplate});
               this.notificationSendRef.afterHide.subscribe(() => {
                  this.notificationSendRef = null;
               });
            }
         } else {
            if (this.notificationSendRef) {
               this.notificationSendRef.hide();
               this.notificationSaveRef = null;
            }
         }
      }
   }

   clearSaveNotification(sendTemplate, isNotificationSent) {
      if (this.notificationSaveRef) {
         this.notificationSaveRef?.hide();
         this.notificationSaveRef = null;
      }
      if (!isNotificationSent) {
         if (!this.notificationSendRef) {
            this.notificationSendRef = this.notificationStyledService.showWarning({content: sendTemplate});
            this.notificationSendRef.afterHide.subscribe(() => {
               this.notificationSendRef = null;
            });
         }
      } else {
         if (this.notificationSendRef) {
            this.notificationSendRef.hide();
            this.notificationSaveRef = null;
         }
      }
   }

   storeCoveredPosition( coveredPosition ) {
      return this.getClient().post( new StoreCoveredPosition( coveredPosition ) );
   }

   getReturnToDuty( param ) {
      return this.getClient().get( new FindReturnToDuty(), param );
   }

   storeReturnToDuty( param ) {
      return this.getClient().post( new StoreReturnToDuty( param ) );
   }

   updateReturnToDuty( param ) {
      return this.getClient().put( new UpdateReturnToDuty( param ) );
   }

   getHelpContentByModule( param )
   {
      return this.getClient().get( new GetHelpContentByModule( param ) )
   }

   storeHelpContentVersion( param )
   {
      return this.getClient().post( new StoreHelpContentVersion( param ), {is_active:true} )
   }

   updateHelpContentVersion( param )
   {
      return this.getClient().put( new UpdateHelpContentVersion( param ), {is_active:true} )
   }

   getUsers( param )
   {
      return this.getClient().get( new GetUser( param ));
   }

   getRoles()
   {
      const param = {}
      return this.getClient().get( new FindRoles() );
   }

   addRoleToUser(param)
   {
      return this.getClient().post( new PostAddRoleToUser( param ) )
   }

   deleteRoleToUser(param)
   {
      return this.getClient().delete( new DeleteRoleFromUser( param ) )
   }

   getRole(param)
   {
      return this.getClient().get( new GetRole( param ) )
   }

   updateRole(param)
   {
      return this.getClient().put( new PutRole( param ) )
   }
}
