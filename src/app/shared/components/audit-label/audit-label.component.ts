import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AuditStatus} from '../../models/interfaces/dtos_additions';

@Component({
  selector: 'app-audit-label',
  templateUrl: './audit-label.component.html',
  styleUrls: ['./audit-label.component.scss'],
   providers: [
      {
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => AuditLabelComponent),
         multi: true
      }
   ]
})
export class AuditLabelComponent implements ControlValueAccessor {
   eAuditStatus = AuditStatus;
   @Input() forName: string;
   // @Input() needsAttention = false;
   @Input() label: string;
   @Input() name: string;
   @Input() disabled: Boolean = false;
   @Output() statusChange: EventEmitter<any> = new EventEmitter<any>();

   public status: AuditStatus;
   public isHover = false;

   @Input()
   public set value(status) {
      this.status = status;
      this.onChange(status);
   }

   constructor(private authService: AuthService) {}

   public isAuditor() {
      return this.authService.isAuditor();
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

   public setStatus(status: AuditStatus) {
      if (this.authService.isAuditor()) {
         this.status = status;
         this.onChange(this.status);
         this.statusChange.emit(this.status);
      }
   }
}
