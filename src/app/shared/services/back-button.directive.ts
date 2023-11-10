import {Directive, HostListener} from '@angular/core';
import {NavigationService} from './navigation.service';

@Directive({
   // tslint:disable-next-line:directive-selector
   selector: '[back-button]'
})
/**
 * Directive to go navigate back.
 */
export class BackButtonDirective {
   constructor(private navigation: NavigationService) {
   }

   @HostListener('click')
   onClick(): void {
      this.navigation.back();
   }
}
