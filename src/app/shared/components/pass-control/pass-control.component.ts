import {Component, Input} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-pass-control',
  templateUrl: './pass-control.component.html',
  styleUrls: ['./pass-control.component.scss']
})
export class PassControlComponent {
   eAuditStatus = AuditStatus;
   @Input() status: AuditStatus;

   constructor() {}

   public getText() {
      switch (this.status) {
         case AuditStatus.NEEDS_ATTENTION:
            return 'Not Approved';
         case AuditStatus.PENDING_REVIEW:
            return 'Ready for Review';
         case AuditStatus.PASSED:
            return 'Pass';
         default:
            return '';
      }
   }
}
