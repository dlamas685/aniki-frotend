import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customText'
})
export class CustomTextPipe implements PipeTransform {

  transform(value: any): string {
    let ctext: string = 'entro '
    if (!isNaN(value)) {
      ctext = value.toString();
    }
    else {
      ctext = value.replace('_', ' ');
    }
    return ctext;
  }

}