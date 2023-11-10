import { PhoneMaskDirective } from './phone-mask.directive';
import {TestBed} from '@angular/core/testing';
import {FormControlDirective, NgControl} from '@angular/forms';


describe('PhoneMaskDirective', () => {
   beforeEach(() => TestBed.configureTestingModule({
      providers: [
         {
            provide: NgControl,
            useValue: new FormControlDirective([], [], null, null)
         }
      ]
   }));

   it('should create an instance', () => {
    const directive = TestBed.createComponent(PhoneMaskDirective);
    expect(directive).toBeTruthy();
  });
});
