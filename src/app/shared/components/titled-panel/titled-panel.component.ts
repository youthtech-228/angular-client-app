import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-titled-panel',
  templateUrl: './titled-panel.component.html',
  styleUrls: ['./titled-panel.component.scss']
})
export class TitledPanelComponent implements OnInit {
   @Input() title: any;
   @Input() icon: any;
   @Input() allowSave: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
