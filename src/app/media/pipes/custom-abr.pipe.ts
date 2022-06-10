import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customABR'
})
export class CustomABRPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 8){
      return value.slice(0, 8) + '...';
    }
    else {
      return value;
    }
  }

}
