import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Component to manage audit message selection. Emits a select event when an auditMessage related component is selected.
 * Allows subscription to select events.
 */
export class AuditMessageSelectService {
   field_id: string;
   eventSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  getSelected(): string {
    return this.field_id;
  }

  select(field_id: string, replyRequired= false): void {
    this.field_id = field_id;
    this.eventSelected.emit({field_id, replyRequired});
  }

  subscribe(callback) {
    this.eventSelected.subscribe(callback);
  }
}
