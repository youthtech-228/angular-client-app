import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HelpContent, StoreAuditMessageTemplate, UpdateAuditMessageTemplate} from '../../../shared/models/dtos';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationStyledService} from '../../../shared/services/notification-styled.service';
import {DataService} from '../../../shared/services/data.service';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.scss']
})
export class HelpContentComponent implements OnInit {
   public templates: HelpContent[] = [];
   public isLoading = false;
   public modules: any[] = [
      {
         id: 1,
         title: 'Instructions',
         path: '/instructions',
         module: 'instructions',
         status: undefined,
      },
      {
         id: 2,
         title: 'Company Information',
         path: '/company-information',
         module: 'company-information',
         status: undefined,
      },
      {
         id: 3,
         title: 'Model Plan',
         path: '/model-plan',
         module: 'model-plan',
         status: undefined,
      },
      {
         id: 4,
         title: 'Employee Awareness',
         path: '/employee-awareness',
         module: 'employee-awareness',
         status: undefined,
      },
      {
         id: 5,
         title: 'Testing Forms',
         path: '/testing-forms',
         module: 'testing-forms',
         status: undefined,
      },
      {
         id: 6,
         title: 'Return to Duty',
         path: '/return-to-duty',
         module: 'return-to-duty',
         status: undefined,
      },
      {
         id: 7,
         title: 'Subcontractors',
         path: '/subcontractors',
         module: 'subcontractors',
         status: undefined,
      },
      {
         id: 8,
         title: 'History Checks',
         path: '/history-checks',
         module: 'history-checks',
         status: undefined,
      },
      {
         id: 9,
         title: 'Random Process',
         path: '/random-process',
         module: 'random-process',
         status: undefined,
      },
      {
         id: 10,
         title: 'Statistical Data',
         path: '/statistical-data',
         module: 'statistical-data',
         status: undefined,
      },
      {
         id: 11,
         title: 'Employee List Validation',
         path: '/employee-list-validation',
         module: 'employee-list-validation',
         status: undefined,
      },
      {
         id: 16,
         title: 'Employee Selection',
         path: '/employee-selection',
         module: 'employee-selection',
         status: undefined,
      },
      {
         id: 12,
         title: 'Supervisor Training',
         path: '/supervisor-training',
         module: 'supervisor-training',
         status: undefined,
      },
      {
         id: 13,
         title: 'Medical Review Officer',
         path: '/medical-review-officer',
         module: 'medical-review-officer',
         status: undefined,
      },
      {
         id: 14,
         title: 'Helpful Information',
         path: '/helpful-information',
         module: 'helpful-information',
         status: undefined,
      },
      {
         id: 15,
         title: 'Audit Review',
         path: '/audit-review',
         module: 'audit-review',
         status: undefined,
      },
   ];
   public selectedModule = null;
   public helpContent = '';
   public isLoadingContent = false;
   public isSaving = false;
   public isPublishing = false;
   @ViewChild('template', {read: TemplateRef}) successTemplate: TemplateRef<any>;
   constructor(private formBuilder: FormBuilder, private notificationStyledService: NotificationStyledService,
     private dataService: DataService, private authService: AuthService) { }

   ngOnInit(): void {
   }
   public valueChange(value: any): void {
      this.helpContent = value;
   }
   public async onModuleSelect()
   {
      this.isLoadingContent = true;
      const moduleId = this.selectedModule.toUpperCase().split('-').join('_')
      this.dataService.getHelpContentByModule( { module_id: moduleId, includeNonActive: true } )
      .then( res => {
         const inactiveHelpContent = res[0].helpContentVersions.filter( h => !h.is_active)
         let latestHelpContentId = -1
         let latestHelpContent = null
         
         inactiveHelpContent.forEach( el => {
            if( latestHelpContentId < el.id )
            {
               latestHelpContentId = el.id
               latestHelpContent = el
            }
         })
         if( latestHelpContent != null )
         {
            this.helpContent = latestHelpContent.content
         }
         else
         {
            const activeHelpContent = res[0].helpContentVersions.filter( h => h.is_active)
            if( activeHelpContent.length > 0 )
            {
               this.helpContent = activeHelpContent[ 0 ]
            }
         }
         this.isLoadingContent = false;
      })
      .catch( e => {
         console.log(e)
         this.isLoadingContent = false;
      })
   }
   public async onStore( activeMode ) {
      if( this.selectedModule == null || this.helpContent == "" )
      {
         return false
      }
      
      const isActive = activeMode == 2
      if( isActive )
      {
         this.isPublishing = true
      }
      else
      {
         this.isSaving = true;
      }
      const moduleId = this.selectedModule.toUpperCase().split('-').join('_')
      const param = {
         module_id: moduleId,
         helpcontentid: 0,
         content: this.helpContent,
         //is_active: isActive
      }
      this.dataService.storeHelpContentVersion( param )
      .then( res => {
         if( isActive )
         {
            this.dataService.updateHelpContentVersion( {
               module_id: moduleId,
               versionnumber: res.version_number
            } )
            .then( res => {
               this.notificationStyledService.showSuccess({content: this.successTemplate});
               this.isPublishing = false
            })
            .catch( e => {
               console.log( e, 'error while adding help content')
            })
         }
         else
         {
            this.isSaving = false
         }
      })
      .catch( e => {
         console.log( e, 'error while adding help content')
      })
   }
}
