import { Pipe, PipeTransform } from '@angular/core';
import { DataMedia } from '../interfaces/data-media.interface';

@Pipe({
  name: 'dataCustom'
})
export class DataCustomPipe implements PipeTransform {

  transform(data: DataMedia ): string {
    if (data.value instanceof Object && !(data.value instanceof Array)){
      return data.value.day!.toString() + '/' + data.value.month!.toString() + '/' + data.value.month!.toString();
    }
    return data.value?.toString() || '';
  }

}
