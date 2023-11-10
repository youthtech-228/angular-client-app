import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HelpContent, StoreAuditMessageTemplate, UpdateAuditMessageTemplate} from '../../../../shared/models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationStyledService} from '../../../../shared/services/notification-styled.service';
import {DataService} from '../../../../shared/services/data.service';
import {AuthService} from '../../../../core/auth.service';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public isPageLoading = false;
  public isPermissionPane = false;
  public gridData: any[] = [];
  public roles;
  public editRole = {
    ApplicationId: "",
    Description: null,
    IsAdmin: false,
    LoweredRoleName: "",
    Permissions: [],
    length: 0,
    RoleId: "",
    RoleName: "",
    UserRoles: null
  }
  public myPerms;
  
  public permissionFilter = "";
  public filteredPermissions;
  public permissions: any[] = [
    { Name:"GET_AddlInfoAnswer"},{ Name:
    "POST_AddlInfoAnswer"},{ Name:
    "PUT_AddlInfoAnswer"},{ Name:
    "DELETE_AddlInfoAnswer"},{ Name:
    "GET_AddlInfoQuestion"},{ Name:
    "POST_AddlInfoQuestion"},{ Name:
    "PUT_AddlInfoQuestion"},{ Name:
    "DELETE_AddlInfoQuestion"},{ Name:
    "GET_Audit"},{ Name:
    "POST_Audit"},{ Name:
    "PUT_Audit"},{ Name:
    "DELETE_Audit"},{ Name:
    "GET_AuditMessage"},{ Name:
    "POST_AuditMessage"},{ Name:
    "PUT_AuditMessage"},{ Name:
    "DELETE_AuditMessage"},{ Name:
    "GET_AuditMessageComment"},{ Name:
    "POST_AuditMessageComment"},{ Name:
    "PUT_AuditMessageComment"},{ Name:
    "DELETE_AuditMessageComment"},{ Name:
    "GET_AuditMessageTemplate"},{ Name:
    "POST_AuditMessageTemplate"},{ Name:
    "PUT_AuditMessageTemplate"},{ Name:
    "DELETE_AuditMessageTemplate"},{ Name:
    "GET_AuditMessageTemplateVersion"},{ Name:
    "POST_AuditMessageTemplateVersion"},{ Name:
    "PUT_AuditMessageTemplateVersion"},{ Name:
    "DELETE_AuditMessageTemplateVersion"},{ Name:
    "GET_Comment"},{ Name:
    "POST_Comment"},{ Name:
    "PUT_Comment"},{ Name:
    "DELETE_Comment"},{ Name:
    "GET_Company"},{ Name:
    "POST_Company"},{ Name:
    "PUT_Company"},{ Name:
    "DELETE_Company"},{ Name:
    "GET_Contact"},{ Name:
    "POST_Contact"},{ Name:
    "PUT_Contact"},{ Name:
    "DELETE_Contact"},{ Name:
    "GET_CoveredPosition"},{ Name:
    "POST_CoveredPosition"},{ Name:
    "PUT_CoveredPosition"},{ Name:
    "DELETE_CoveredPosition"},{ Name:
    "GET_CR_GREF_Employee"},{ Name:
    "POST_CR_GREF_Employee"},{ Name:
    "PUT_CR_GREF_Employee"},{ Name:
    "DELETE_CR_GREF_Employee"},{ Name:
    "GET_CR_JobFunction"},{ Name:
    "POST_CR_JobFunction"},{ Name:
    "PUT_CR_JobFunction"},{ Name:
    "DELETE_CR_JobFunction"},{ Name:
    "GET_CR_Policy"},{ Name:
    "POST_CR_Policy"},{ Name:
    "PUT_CR_Policy"},{ Name:
    "DELETE_CR_Policy"},{ Name:
    "GET_CR_TB_Policy"},{ Name:
    "POST_CR_TB_Policy"},{ Name:
    "PUT_CR_TB_Policy"},{ Name:
    "DELETE_CR_TB_Policy"},{ Name:
    "GET_CR_TestingProtocolLab"},{ Name:
    "POST_CR_TestingProtocolLab"},{ Name:
    "PUT_CR_TestingProtocolLab"},{ Name:
    "DELETE_CR_TestingProtocolLab"},{ Name:
    "GET_Email"},{ Name:
    "POST_Email"},{ Name:
    "DELETE_Email"},{ Name:
    "GET_Employee"},{ Name:
    "POST_Employee"},{ Name:
    "PUT_Employee"},{ Name:
    "PATCH_Employee"},{ Name:
    "DELETE_Employee"},{ Name:
    "GET_EmployeeValidation"},{ Name:
    "POST_EmployeeValidation"},{ Name:
    "DELETE_EmployeeValidation"},{ Name:
    "PATCH_EmployeeValidation"},{ Name:
    "PUT_EmployeeValidation"},{ Name:
    "GET_EmployeeValidationFile"},{ Name:
    "POST_EmployeeValidationFile"},{ Name:
    "PUT_EmployeeValidationFile"},{ Name:
    "DELETE_EmployeeValidationFile"},{ Name:
    "GET_File"},{ Name:
    "POST_File"},{ Name:
    "DELETE_File"},{ Name:
    "GET_HelpContent"},{ Name:
    "POST_HelpContent"},{ Name:
    "PUT_HelpContent"},{ Name:
    "DELETE_HelpContent"},{ Name:
    "PATCH_HelpContent"},{ Name:
    "GET_HelpContentVersion"},{ Name:
    "POST_HelpContentVersion"},{ Name:
    "PUT_HelpContentVersion"},{ Name:
    "DELETE_HelpContentVersion"},{ Name:
    "GET_HistoryCheckForm"},{ Name:
    "POST_HistoryCheckForm"},{ Name:
    "PUT_HistoryCheckForm"},{ Name:
    "DELETE_HistoryCheckForm"},{ Name:
    "GET_MedicalReviewOfficer"},{ Name:
    "POST_MedicalReviewOfficer"},{ Name:
    "PUT_MedicalReviewOfficer"},{ Name:
    "DELETE_MedicalReviewOfficer"},{ Name:
    "GET_MessageTemplate"},{ Name:
    "POST_MessageTemplate"},{ Name:
    "PUT_MessageTemplate"},{ Name:
    "DELETE_MessageTemplate"},{ Name:
    "GET_MessageTemplateVersion"},{ Name:
    "POST_MessageTemplateVersion"},{ Name:
    "PUT_MessageTemplateVersion"},{ Name:
    "DELETE_MessageTemplateVersion"},{ Name:
    "GET_ModelPlan"},{ Name:
    "POST_ModelPlan"},{ Name:
    "PUT_ModelPlan"},{ Name:
    "DELETE_ModelPlan"},{ Name:
    "GET_ModelPlanTermAgreement"},{ Name:
    "POST_ModelPlanTermAgreement"},{ Name:
    "PUT_ModelPlanTermAgreement"},{ Name:
    "DELETE_ModelPlanTermAgreement"},{ Name:
    "GET_Notification"},{ Name:
    "POST_Notification"},{ Name:
    "PUT_Notification"},{ Name:
    "DELETE_Notification"},{ Name:
    "GET_NotificationEvent"},{ Name:
    "POST_NotificationEvent"},{ Name:
    "PUT_NotificationEvent"},{ Name:
    "DELETE_NotificationEvent"},{ Name:
    "GET_NotificationEventRecord"},{ Name:
    "POST_NotificationEventRecord"},{ Name:
    "PUT_NotificationEventRecord"},{ Name:
    "DELETE_NotificationEventRecord"},{ Name:
    "GET_Policy"},{ Name:
    "POST_Policy"},{ Name:
    "PUT_Policy"},{ Name:
    "DELETE_Policy"},{ Name:
    "GET_RandomProcess"},{ Name:
    "POST_RandomProcess"},{ Name:
    "PUT_RandomProcess"},{ Name:
    "DELETE_RandomProcess"},{ Name:
    "GET_ReturnToDuty"},{ Name:
    "POST_ReturnToDuty"},{ Name:
    "PUT_ReturnToDuty"},{ Name:
    "DELETE_ReturnToDuty"},{ Name:
    "GET_StatisticalData"},{ Name:
    "POST_StatisticalData"},{ Name:
    "PUT_StatisticalData"},{ Name:
    "DELETE_StatisticalData"},{ Name:
    "GET_Subcontractor"},{ Name:
    "POST_Subcontractor"},{ Name:
    "PUT_Subcontractor"},{ Name:
    "DELETE_Subcontractor"},{ Name:
    "GET_Supervisor"},{ Name:
    "POST_Supervisor"},{ Name:
    "PUT_Supervisor"},{ Name:
    "DELETE_Supervisor"},{ Name:
    "POST_SupervisorTrainingFile"},{ Name:
    "GET_TestingForm"},{ Name:
    "POST_TestingForm"},{ Name:
    "PUT_TestingForm"},{ Name:
    "DELETE_TestingForm"},{ Name:
    "GET_User"},{ Name:
    "POST_User"},{ Name:
    "PATCH_User"},{ Name:
    "DELETE_User"},{ Name:
    "GET_Role"},{ Name:
    "POST_Role"},{ Name:
    "PATCH_Role"},{ Name:
    "PUT_Role"},{ Name:
    "DELETE_Role"}
  ];
  constructor(private formBuilder: FormBuilder, private notificationStyledService: NotificationStyledService,
    private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.getRoles()
    .then( res => {
      this.roles = res
      this.gridData = this.roles
    })
    this.filteredPermissions = this.permissions
  }
  public onFilter(inputValue: string): void {
    this.gridData = process(this.roles, {
        filter: {
            logic: "or",
            filters: [
                {
                  field: 'name',
                  operator: 'contains',
                  value: inputValue
                },
            ],
        }
    }).data;

    this.dataBinding.skip = 0;
  }

  public onRoleEdit( role ) {
    this.editRole = Object.assign( {}, role )
    this.isPermissionPane = true
    this.updateRoleSelection()
  }
  public updateRoleSelection()
  {
    this.roles.forEach( role => {
      role.checked = false
    });
    this.editRole.Permissions.forEach( myPerm => {
      const perm = this.permissions.find( perm => perm.Name == myPerm.Name )
      
      if( perm )
      {
        perm.checked = true
      }
    });
  }
  public onPermissionToggle()
  {

  }
  public onFilterPermission()
  {
    if( this.permissionFilter == "")
    {
      this.filteredPermissions = this.permissions
    }
    else
    {
      this.filteredPermissions = this.permissions.filter( p => p.toLowerCase().includes( this.permissionFilter.toLowerCase() ) )
    }
  }
}
