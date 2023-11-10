import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDotNet'
})
export class DateNetPipePipe implements PipeTransform {

  transform(value: Date | string | unknown): Date {
     if (value && typeof value === 'string') {
        const dateString = value;
        const pattern = /Date\(([^)]+)/;
        const results = pattern.exec(dateString);
        if (results?.length > 0) {
           return new Date(parseFloat(results[1]));
        } else {
           return new Date(dateString);
        }
     } else if (value instanceof Date) {
        return value;
     } else {
        return new Date();
     }
  }
}
