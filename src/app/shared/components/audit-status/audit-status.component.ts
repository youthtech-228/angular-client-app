import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-audit-status',
  templateUrl: './audit-status.component.html',
  styleUrls: ['./audit-status.component.scss']
})
export class AuditStatusComponent implements OnInit {
   eAuditStatus = AuditStatus;
   @Input() status: AuditStatus;
   @Input() labelHover = false;
   @Output() statusChange: EventEmitter<any> = new EventEmitter<any>();
   public isHover = false;

   constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

   public isAuditor() {
      return this.authService.isAuditor();
   }

   public setStatus(status: AuditStatus) {
      if (this.authService.isAuditor()) {
         this.status = status;
         this.statusChange.emit(this.status);
      }
   }
}
