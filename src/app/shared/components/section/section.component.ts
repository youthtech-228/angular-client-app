import {Component, Input} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() title: string;
  @Input() status: AuditStatus;
  eAuditStatus = AuditStatus;

  constructor() { }
}
