import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HelpContent, StoreAuditMessageTemplate, UpdateAuditMessageTemplate} from '../../../shared/models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationStyledService} from '../../../shared/services/notification-styled.service';
import {DataService} from '../../../shared/services/data.service';
import {AuthService} from '../../../core/auth.service';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  public userTabSelected = true;
  @ViewChild('userElement') userComponent: UserComponent;
  @ViewChild('roleElement') roleComponent: RoleComponent;
  constructor(
    private formBuilder: FormBuilder,
    private notificationStyledService: NotificationStyledService,
    private dataService: DataService, 
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  public onTabSelect(e)
  {
    this.userTabSelected = e.index == 0
  }
}
