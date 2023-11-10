import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationStyledService} from '../../../../shared/services/notification-styled.service';
import {DataService} from '../../../../shared/services/data.service';
import {AuthService} from '../../../../core/auth.service';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { ChipRemoveEvent } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public isPageLoading = false;
  public users: any[] = [];
  public selectedUsers: string[] = [];
  public gridData: any[] = [];
  public roles;
  public filteredRoles
  public toggleSidebar: boolean = false;
  public roleFilter = "";
  public myRoles: any[] = [];
  public selectedUserIdx = 0;
  public sidebarMode = true;
  constructor(
    private formBuilder: FormBuilder,
    private notificationStyledService: NotificationStyledService,
    private dataService: DataService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isPageLoading = true
    Promise.all([
      this.dataService.getUsers( {} ),
      this.dataService.getRoles()
    ])
    .then( res => {
      this.users.push( { ...{ idx: 0}, ...res[0]} )
      this.gridData = this.users
      this.roles = res[1]
      this.filteredRoles = this.roles
      this.isPageLoading = false
    })
  }
  public onUserEdit( idx )
  {
    const myRoles = this.users[ idx ].roles
    this.myRoles = []
    myRoles.forEach( myRole => {
      const role = this.roles.find( role => role.RoleName == myRole )
      if( role )
      {
        this.myRoles.push ( Object.assign({},role) )
      }
    });
    
    this.updateRoleSelection()
    this.selectedUserIdx = idx
    this.toggleSidebar = true
  }
  public updateRoleSelection()
  {
    this.roles.forEach( role => {
      role.checked = false
    });
    this.myRoles.forEach( myRole => {
      const role = this.roles.find( role => role.RoleName == myRole.RoleName )
      
      if( role )
      {
        role.checked = true
      }
    });
  }
  public onMyRoleRemove( e: ChipRemoveEvent )
  {
    this.sidebarMode = false
    const index = this.myRoles
      .map(( role ) => role.RoleName )
      .indexOf(e.sender.label);
    this.deleteRole( this.myRoles[ index ].RoleId )
    
    this.myRoles.splice(index, 1);
    this.updateRoleSelection()
    setTimeout(() => {
      this.sidebarMode = true
    }, 1000);
  }
  public onFilterRole()
  {
    if( this.roleFilter == "")
    {
      this.filteredRoles = this.roles
    }
    else
    {
      this.filteredRoles = this.roles.filter( role => role.RoleName.toLowerCase().includes( this.roleFilter.toLowerCase() ) )
    }
  }
  public onRoleToggle( e: string, role )
  {
    const userId = this.users[ this.selectedUserIdx ].user_id
    const roleId = role.RoleId
    if( !e )
    {
      const index = this.myRoles
      .map(( role ) => role.RoleId )
      .indexOf(role.RoleId);
      this.myRoles.splice(index, 1);
      this.deleteRole( roleId)
    }
    else
    {
      this.myRoles.push( role )
      this.dataService.addRoleToUser({
        id: userId,
        roleId: roleId
      })
      .then( () => {
        this.users[ this.selectedUserIdx ].roles = []
        this.myRoles.forEach( role => {
          this.users[ this.selectedUserIdx ].roles.push( role.RoleName )
        })
      })
    }
    this.users[ this.selectedUserIdx ].roles = Object.assign( {}, this.myRoles )
  }
  public deleteRole( roleId )
  {
    const userId = this.users[ this.selectedUserIdx ].user_id
    this.dataService.deleteRoleToUser({
      id: userId,
      roleId: roleId
    })
    .then( () => {
      this.users[ this.selectedUserIdx ].roles = []
      this.myRoles.forEach( role => {
        this.users[ this.selectedUserIdx ].roles.push( role.RoleName )
      })
    })
    
  }
  public onFilter(inputValue: string): void {
    this.gridData = process(this.users, {
        filter: {
            logic: "or",
            filters: [
                {
                    field: 'username',
                    operator: 'contains',
                    value: inputValue
                },
            ],
        }
    }).data;

    this.dataBinding.skip = 0;
  }
}
