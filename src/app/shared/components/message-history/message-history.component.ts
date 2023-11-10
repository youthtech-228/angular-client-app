import {Component, Input, OnInit} from '@angular/core';
import {AuditMessage} from '../../models/dtos';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss']
})
export class MessageHistoryComponent implements OnInit {
   @Input() message: AuditMessage;

  constructor(private authService: AuthService, ) { }

  ngOnInit(): void {
  }

   public isUserNcms() {
      return this.authService.isAuditor();
   }

}
