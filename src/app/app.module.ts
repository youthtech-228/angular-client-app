import {InstructionsComponent} from './shared/components/instructions/instructions.component';
import {InstructionsPageComponent} from './shared/modules/instructions/instructions-page.component';
import {AdditionalInformationComponent} from './shared/modules/company-information/additional-information/additional-information.component';
import {ThirdPartyComponent} from './shared/modules/company-information/third-party/third-party.component';
import {RequirementsComponent} from './shared/modules/company-information/requirements/requirements.component';
import {ContactsComponent} from './shared/modules/company-information/contacts/contacts.component';
import {AuditQuestionnaireHeaderComponent} from './shared/components/audit-questionnaire-header/audit-questionnaire-header.component';
import {InternalCommentsComponent} from './shared/modules/company-information/internal-comments/internal-comments.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ExcelModule, GridModule, PDFModule} from '@progress/kendo-angular-grid';
import { EditorModule } from "@progress/kendo-angular-editor";

import {AppComponent} from './app.component';
import {NavMenuComponent} from './shared/components/nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {ModuleListComponent} from './shared/components/module-list/module-list.component';
import {CompanyInformationComponent} from './shared/modules/company-information/company-information.component';
import {MessageCenterComponent} from './messages/message-center/message-center.component';
import {PassControlComponent} from './shared/components/pass-control/pass-control.component';
import {CompanyFormComponent} from './shared/modules/company-information/company-form/company-form.component';
import {MessagePanelComponent} from './shared/components/message-panel/message-panel.component';
import {ContactEditComponent} from './shared/modules/company-information/contacts/contactEdit/contact-edit.component';
import {MessageComponent} from './shared/components/message/message.component';
import {MessageListComponent} from './messages/message-list/message-list.component';
import {AuditableInputComponent} from './shared/components/auditable-input/auditable-input.component';
import {SectionComponent} from './shared/components/section/section.component';
import {ModalComponent} from './shared/components/modal/modal.component';
import {EmployeeListComponent} from './shared/components/employee-list/employee-list.component';
import {UploadModule} from '@progress/kendo-angular-upload';
import {EmployeeListPageComponent} from './shared/modules/employee-list-page/employee-list-page.component';
import {ActionCenterComponent} from './modals/action-center/action-center.component';
import {TitleBarComponent} from './shared/components/title-bar/title-bar.component';
import {SearchComponent} from './shared/components/search/search.component';
import {ModuleBaseComponent} from './shared/modules/module-base.component';
import {ModelPlanComponent} from './shared/modules/model-plan/model-plan.component';
import {CompanyExtraFormComponent} from './shared/modules/company-information/company-extra-form/company-extra-form.component';
import {NameAddressFormComponent} from './shared/components/name-address-form/name-address-form.component';
import {ContactPhoneAddressComponent} from './shared/components/contact-phone-address/contact-phone-address.component';
import {ContactListAddressPhoneComponent} from './shared/components/contact-list-address-phone/contact-list-address-phone.component';
import {CoveredPositionsTableComponent} from './shared/modules/model-plan/covered-positions-table/covered-positions-table.component';
import {EmployeeAwarenessComponent} from './shared/modules/employee-awareness/employee-awareness.component';
import {TestingFormsComponent} from './shared/modules/testing-forms/testing-forms.component';
import {SubcontractorsComponent} from './shared/modules/subcontractors/subcontractors.component';
import {ReturnToDutyComponent} from './shared/modules/return-to-duty/return-to-duty.component';
import {HistoryChecksComponent} from './shared/modules/history-checks/history-checks.component';
import {RandomProcessComponent} from './shared/modules/random-process/random-process.component';
import {PoolTypesComponent} from './shared/modules/random-process/pool-types/pool-types.component';
import {ButtonInfoComponent} from './shared/components/button-info/button-info.component';
import {StatisticalDataComponent} from './shared/modules/statistical-data/statistical-data.component';
import {EmployeeListValidationComponent} from './shared/modules/employee-list-validation/employee-list-validation.component';
import {EmployeeSelectionComponent} from './shared/modules/employee-selection/employee-selection.component';
import {TitledPanelComponent} from './shared/components/titled-panel/titled-panel.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {EmployeeCardComponent} from './shared/modules/employee-list-validation/employee-card/employee-card.component';
import {BackButtonDirective} from './shared/services/back-button.directive';
import {SupervisorTrainingComponent} from './shared/modules/supervisor-training/supervisor-training.component';
import {SupervisorTraningListComponent} from './shared/modules/supervisor-training/supervisor-traning-list/supervisor-traning-list.component';
import {MedicalReviewOfficerComponent} from './shared/modules/medical-review-officer/medical-review-officer.component';
import {HelpfulInformationComponent} from './shared/modules/helpful-information/helpful-information.component';
import {AuditReviewComponent} from './shared/modules/audit-review/audit-review.component';
import {AuditTableComponent} from './shared/modules/audit-review/audit-table/audit-table.component';
import {TooltipModule} from '@progress/kendo-angular-tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {ReadMoreComponent} from './shared/components/read-more/read-more.component';
import {CompanyCardComponent} from './modals/action-center/company-card/company-card.component';
import {FilterBarComponent} from './modals/action-center/filter-bar/filter-bar.component';
import {CoreModule} from './core/core.module';
import {AuthGuardWithForcedLogin} from './core/auth-guard-with-forced-login.service';
import {LabelModule} from '@progress/kendo-angular-label';
import {NotificationModule} from '@progress/kendo-angular-notification';
import { ImageToggleComponent } from './shared/components/image-toggle/image-toggle.component';
import { PhoneMaskDirective } from './shared/components/phone-mask.directive';
import { AuditLabelComponent } from './shared/components/audit-label/audit-label.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { DateNetPipePipe } from './shared/services/date-net-pipe.pipe';
import { ContactComponent } from './shared/modules/company-information/contacts/contact/contact.component';
import { PhoneNumberPipe } from './shared/services/phone-number.pipe';
import { AuditableCheckboxComponent } from './shared/components/auditable-checkbox/auditable-checkbox.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import { ContactDisplayComponent } from './shared/modules/company-information/contacts/contact-display/contact-display.component';
import { ToastSaveComponent } from './shared/components/toast-save/toast-save.component';
import { AuditStatusComponent } from './shared/components/audit-status/audit-status.component';
import {PendingChangesGuard} from './shared/services/pending-changes.guard';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { IconsModule } from "@progress/kendo-angular-icons";
import { SettingsComponent } from './modals/settings/settings.component';
import { AuditMessageTemplateComponent } from './modals/settings/audit-message-template/audit-message-template.component';
import { HelpContentComponent } from './modals/settings/help-content/help-content.component';
import { GeneralSettingsComponent } from './modals/settings/general-settings/general-settings.component';
import { UploadFilesComponent } from './shared/components/upload-files/upload-files.component';
import { InternalCommentComponent } from './shared/modules/company-information/internal-comments/internal-comment/internal-comment.component';
import { MessageHistoryComponent } from './shared/components/message-history/message-history.component';
import { AuditableRadioComponent } from './shared/components/auditable-radio/auditable-radio.component';
import { AuditableGenericComponent } from './shared/components/auditable-generic/auditable-generic.component';

import { UserRoleComponent } from './modals/settings/user-role/user-role.component';
import { UserComponent } from './modals/settings/user-role/user/user.component';
import { RoleComponent } from './modals/settings/user-role/role/role.component';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      FetchDataComponent,
      ModuleListComponent,
      InternalCommentsComponent,
      AuditQuestionnaireHeaderComponent,
      ContactsComponent,
      RequirementsComponent,
      ThirdPartyComponent,
      AdditionalInformationComponent,
      CompanyInformationComponent,
      InstructionsComponent,
      InstructionsPageComponent,
      PassControlComponent,
      CompanyFormComponent,
      MessagePanelComponent,
      ContactEditComponent,
      MessageComponent,
      MessageListComponent,
      MessageCenterComponent,
      AuditableInputComponent,
      SectionComponent,
      ModalComponent,
      EmployeeListComponent,
      EmployeeListPageComponent,
      ActionCenterComponent,
      TitleBarComponent,
      SearchComponent,
      ModuleBaseComponent,
      ModelPlanComponent,
      CompanyExtraFormComponent,
      NameAddressFormComponent,
      ContactPhoneAddressComponent,
      ContactListAddressPhoneComponent,
      CoveredPositionsTableComponent,
      EmployeeAwarenessComponent,
      TestingFormsComponent,
      SubcontractorsComponent,
      ReturnToDutyComponent,
      HistoryChecksComponent,
      RandomProcessComponent,
      PoolTypesComponent,
      ButtonInfoComponent,
      StatisticalDataComponent,
      EmployeeListValidationComponent,
      EmployeeSelectionComponent,
      TitledPanelComponent,
      SidebarComponent,
      EmployeeCardComponent,
      BackButtonDirective,
      SupervisorTrainingComponent,
      SupervisorTraningListComponent,
      MedicalReviewOfficerComponent,
      HelpfulInformationComponent,
      AuditReviewComponent,
      AuditTableComponent,
      ReadMoreComponent,
      CompanyCardComponent,
      FilterBarComponent,
      ImageToggleComponent,
      PhoneMaskDirective,
      AuditLabelComponent,
      CommentComponent,
      DateNetPipePipe,
      ContactComponent,
      PhoneNumberPipe,
      AuditableCheckboxComponent,
      ContactDisplayComponent,
      ToastSaveComponent,
      AuditStatusComponent,
      SettingsComponent,
      AuditMessageTemplateComponent,
      HelpContentComponent,
      GeneralSettingsComponent,
      UploadFilesComponent,
      InternalCommentComponent,
      MessageHistoryComponent,
      AuditableRadioComponent,
      AuditableGenericComponent,
      UserRoleComponent,
      UserComponent,
      RoleComponent
   ],
   imports: [
      BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
      SidebarModule.forRoot(),
      HttpClientModule,
      FormsModule,
      LayoutModule,
      // AuthModule.forRoot(),
      CoreModule.forRoot(),
      RouterModule.forRoot([
         {path: '', component: HomeComponent, pathMatch: 'full'},
         {path: 'instructions', component: InstructionsPageComponent},
         {
            path: 'company-information', component: CompanyInformationComponent,
            canActivate: [AuthGuardWithForcedLogin], canDeactivate: [PendingChangesGuard],
         },
         {path: 'model-plan', component: ModelPlanComponent},
         {path: 'employee-awareness', component: EmployeeAwarenessComponent},
         {path: 'testing-forms', component: TestingFormsComponent},
         {path: 'return-to-duty', component: ReturnToDutyComponent},
         {path: 'subcontractors', component: SubcontractorsComponent},
         {path: 'history-checks', component: HistoryChecksComponent},
         {path: 'random-process', component: RandomProcessComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'statistical-data', component: StatisticalDataComponent},
         {path: 'employee-list-validation', component: EmployeeListValidationComponent},
         {path: 'employee-selection', component: EmployeeSelectionComponent},
         {path: 'supervisor-training', component: SupervisorTrainingComponent},
         {path: 'medical-review-officer', component: MedicalReviewOfficerComponent},
         {path: 'helpful-information', component: HelpfulInformationComponent},
         {path: 'audit-review', component: AuditReviewComponent},
         {path: 'action-center', component: ActionCenterComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'settings', component: SettingsComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'user-role', component: UserRoleComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'audit-message-template', component: AuditMessageTemplateComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'help-content', component: HelpContentComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: 'general-settings', component: GeneralSettingsComponent, canActivate: [AuthGuardWithForcedLogin]},
         {path: '**', redirectTo: '/login', pathMatch: 'full'}

         // {path: 'msg', loadChildren: './messages/message-module#MessageModule'},
      ], {relativeLinkResolution: 'legacy'}),
      ReactiveFormsModule,
      GridModule,
      PDFModule,
      ExcelModule,
      UploadModule,
      TooltipModule,
      BrowserAnimationsModule,
      DateInputsModule,
      LabelModule,
      NotificationModule,
      ButtonsModule,
      InputsModule,
      IconsModule,
      EditorModule,
      ProgressBarModule
   ],
   providers: [
   ],
   bootstrap: [AppComponent],
})
export class AppModule {
}
