import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AuditStatus} from '../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
   @Input() title: string;
   @Input() icon: string;
   @Input() status: AuditStatus = AuditStatus.NEEDS_ATTENTION;
   @Input() canSave = true;
   @ViewChild('modalbody') bodyEl: ElementRef;

   constructor() { }

   ngOnInit(): void {
   }
}
