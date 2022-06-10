import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customValue'
})
export class CustomValuePipe implements PipeTransform {

  transform(value: any): boolean {
    if (!value) {
      return false;
    }
    else if (Array.isArray(value)) {
      return false;
    }
    return true;
  }

}
