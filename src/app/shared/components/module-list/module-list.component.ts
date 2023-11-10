import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuditService} from '../../services/audit.service';
import {ActivatedRoute} from '@angular/router';
import {find} from 'lodash-es';

@Component({
   selector: 'app-module-list',
   templateUrl: './module-list.component.html',
   styleUrls: ['./module-list.component.scss'],
})
export class ModuleListComponent implements OnInit, OnChanges {
   ncms_id: string;
   @Input() status: AuditStatus;
   @Input() module: string;

   moduleList = [
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
   eAuditStatus = AuditStatus;

   constructor(private route: ActivatedRoute, private auditService: AuditService) {
      this.ncms_id = this.route.snapshot.paramMap.get('id');
   }

   async ngOnInit() {

      const needsAttentionMessages = await this.auditService.getNeedsAttentionMessages(this.ncms_id, 'company-information');
      const needsAttentionCount = needsAttentionMessages?.length || 0;

      if (needsAttentionCount <= 0) {
         const pendingMessages = await this.auditService.getPendingMessages(this.ncms_id, 'company-information');
         this.moduleList[1].status = pendingMessages?.length > 0 ? AuditStatus.PENDING_REVIEW : undefined;
      } else {
         this.moduleList[1].status = AuditStatus.NEEDS_ATTENTION;
      }

      if (this.status) {
         const currentModule = find(this.moduleList, {module: this.module});
         currentModule.status = this.status;
      }
   }

   public ngOnChanges(changes: SimpleChanges) {
      if (changes?.status) {
         const currentModule = find(this.moduleList, {module: this.module});

         if (currentModule) {
            currentModule.status = changes?.status?.currentValue;
         }
      }
   }

   public sendContractorNotification() {

   }
}
