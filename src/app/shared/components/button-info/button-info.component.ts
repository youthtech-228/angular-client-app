import {Component, Input, OnInit} from '@angular/core';

export enum InfoType {
   error = 'error',
   info = 'info',
}

@Component({
  selector: 'app-button-info',
  templateUrl: './button-info.component.html',
  styleUrls: ['./button-info.component.scss']
})
export class ButtonInfoComponent implements OnInit {
   eInfoType = InfoType;
   @Input() info: string;
   @Input() placement: any = 'top';
   @Input() type = InfoType.info;

  constructor() { }

  ngOnInit(): void {
  }
}
