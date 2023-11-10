import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
   providedIn: 'root'
})

export class NavigationService {
   private historyCount = 0;

   constructor(private router: Router, private location: Location) {
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            this.historyCount += 1;
         }
      });
   }

   back(): void {
      this.historyCount--;
      if (this.historyCount > 0) {
         this.location.back();
      } else {
         this.router.navigateByUrl('/');
      }
   }
}
