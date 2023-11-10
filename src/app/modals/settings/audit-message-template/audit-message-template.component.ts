import { Component, OnInit } from '@angular/core';
import {AuditMessageTemplate, StoreAuditMessageTemplate, UpdateAuditMessageTemplate} from '../../../shared/models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationStyledService} from '../../../shared/services/notification-styled.service';
import {DataService} from '../../../shared/services/data.service';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-audit-message-template',
  templateUrl: './audit-message-template.component.html',
  styleUrls: ['./audit-message-template.component.scss']
})
export class AuditMessageTemplateComponent implements OnInit {
   public templates: AuditMessageTemplate[] = [];
   public isLoading = false;
   public auditMessageTemplatesForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private notificationStyledService: NotificationStyledService,
     private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
     this.auditMessageTemplatesForm = this.formBuilder.group({
        name: ['', Validators.required],
        moduleId: ['', Validators.required],
        fieldId: ['', Validators.required],
        ncms_Id: [this.authService.getNcmsId()],
     });
  }

   public async save() {
      if (this.auditMessageTemplatesForm?.dirty) {
         try {
            if (this.auditMessageTemplatesForm.value?.id) {
               await this.dataService.getClient()
                  .put(new UpdateAuditMessageTemplate(this.auditMessageTemplatesForm.value));
            } else {
               await this.dataService.getClient()
                  .post(new StoreAuditMessageTemplate(this.auditMessageTemplatesForm.value));
            }
         } catch (e) {
            console.log(e);
            this.notificationStyledService.showError({content: 'Could not load the audit message.'});
         }
      }
   }
}
