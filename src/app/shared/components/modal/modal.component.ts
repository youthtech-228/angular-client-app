import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
   @Input() elementId: string;
   @Input() title: string;
   @Input() submitLabel = 'Save';
   @Input() cancelLabel = 'Cancel';
   @Output() submit: EventEmitter<any> = new EventEmitter<any>();
   // @ViewChild('modalbody') bodyEl: ElementRef;

  constructor() { }

   // onClick() {
   //    $(`#${this.elementId}`).modal('hide');
   // }
   public handleClick() {
      this.submit.emit();
   }
}
