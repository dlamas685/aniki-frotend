import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MultiSelectMedia } from '../../interfaces/filters.interface';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styles: [
  ]
})
export class MultiselectFilterComponent implements OnInit {

  
  @Input() multiselect_name: string = '';
  @Input() multiselect_options: MultiSelectMedia[] = [];
  @Input() selectedItems: string [] = [];
  @Output() onSelectedOptions: EventEmitter<string[]> = new EventEmitter();


  constructor() {   

   }

  ngOnInit(): void {
  }

  filterMedia(): void {
    this.onSelectedOptions.emit(this.selectedItems);
  }

}
