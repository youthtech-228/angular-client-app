import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
   name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

   transform(rawNum: string): unknown {
      let countryCodeStr = '';
      let index = 0;

      if (rawNum) {
         let phone;

         if (rawNum.indexOf('-') >= 0) {
            phone = rawNum.replace(/-/g, '');
         } else {
            phone = rawNum;
         }

         if (phone?.length > 10) {
            countryCodeStr = phone.slice(0, 2);
            index += 2;
         }

         const areaCodeStr = phone.slice(index, index + 3);
         index += 3;
         const midSectionStr = phone.slice(index, index + 3);
         index += 3;
         const lastSectionStr = phone.slice(index);

         return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
      }
   }
}
