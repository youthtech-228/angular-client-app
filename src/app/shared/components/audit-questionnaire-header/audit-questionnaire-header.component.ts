import {Component, EventEmitter, Output , OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-audit-questionnaire-header',
  templateUrl: './audit-questionnaire-header.component.html',
  styleUrls: ['./audit-questionnaire-header.component.scss'],
})
export class AuditQuestionnaireHeaderComponent implements OnInit {
  
  @Output() toggleHelpPanel = new EventEmitter();
  @Input() title: string = '';
  @Input() instruction: string = '';
  constructor() {}

  ngOnInit() {}
}
