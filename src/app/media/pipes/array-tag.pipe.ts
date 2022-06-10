import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTag'
})
export class ArrayTagPipe implements PipeTransform {

  transform(value: any): string [] {
    if (Array.isArray(value)){
      return [...value];
    }
    else {
      return [];
    }
  }

}
