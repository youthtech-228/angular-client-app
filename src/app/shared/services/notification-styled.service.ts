import { Injectable } from '@angular/core';
import {NotificationRef, NotificationService, NotificationSettings} from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationStyledService extends NotificationService {

   public showWarning(settings: NotificationSettings): NotificationRef {
      return super.show({
         cssClass: 'warning-notification',
         animation: { type: 'slide', duration: 400 },
         position: { horizontal: 'center', vertical: 'top' },
         closable: true,
         ...settings,
      });
   }

   public showSuccess(settings: NotificationSettings): NotificationRef {
      return super.show({
         cssClass: 'button-notification',
         animation: {type: 'slide', duration: 400},
         position: {horizontal: 'center', vertical: 'bottom'},
         type: {style: 'success', icon: true},
         closable: false,
         hideAfter: 3000,
         ...settings,
      });
   }

   public showError(settings: NotificationSettings): NotificationRef {
      return super.show({
         cssClass: 'button-notification',
         animation: {type: 'slide', duration: 400},
         position: {horizontal: 'center', vertical: 'bottom'},
         type: {style: 'error', icon: true},
         closable: true,
         ...settings,
      });
   }
}
