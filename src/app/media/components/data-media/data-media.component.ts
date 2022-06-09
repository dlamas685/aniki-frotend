import { Component, Input, OnInit } from '@angular/core';
import { DataMedia } from '../../interfaces/data-media.interface';

@Component({
  selector: 'app-data-media',
  templateUrl: './data-media.component.html',
  styles: [
  ]
})
export class DataMediaComponent implements OnInit {

  // @Input() mediaSmall: DataMedia = {};

  @Input() titleData: string = '';
  @Input() data: any;


  constructor() { }

  ngOnInit(): void {
  }

  // getDataFormat(): string {
  //   return this.mediaSmall.value?.toString() || '';
  // }

  // getTitleFormat(): string {
  //   return this.mediaSmall.title?.toString() || '';
  // }
  
}
