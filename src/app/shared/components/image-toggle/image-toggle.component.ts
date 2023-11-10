import {Component, Input, forwardRef, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
   selector: 'app-image-toggle',
   templateUrl: './image-toggle.component.html',
   styleUrls: ['./image-toggle.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => ImageToggleComponent),
         multi: true
      }
   ]
})
export class ImageToggleComponent implements ControlValueAccessor {
   @Input()
   public image: string;
   @Input()
   public imageOff: string;

   @Input()
   public disabled: boolean;

   @Input()
   public set value(isChecked: boolean) {
      if (!this.disabled) {
         this.isChecked = isChecked;
         this.onChange(isChecked);
      }
   }

   public isChecked: boolean;

   constructor() {
      this.disabled = false;
   }

   public onChange: any = () => {};
   public onTouch: any = () => {};

   public writeValue(value: any): void {
      this.value = value;
   }

   public registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   public registerOnTouched(fn: any): void {
      this.onTouch = fn;
   }

   public setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }

   public toggleChecked(): void {
      if (!this.disabled) {
         this.isChecked = !this.isChecked;
         this.onChange(this.isChecked);
      }
   }

   // public get classes(): string {
   //    return this.color + ' ' + this.size + ' ' + this.shape;
   // }
}
