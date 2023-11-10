import {Component, Input, OnInit} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
   @Input() instructions;
   status = AuditStatus.PASSED;
  constructor() {}

  ngOnInit() {}
}
