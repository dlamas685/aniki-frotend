import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectMedia } from '../../interfaces/filters.interface';
import { MediaFormat } from '../../interfaces/media.enum';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styles: []
})
export class SelectFilterComponent implements OnInit {

  @Input() select_name: string = '';
  @Input() select_options: SelectMedia[] = [];
  @Output() onSelectedItem: EventEmitter<any> = new EventEmitter();
  @Input() selectedItems: any;

  constructor() {

  }

  ngOnInit(): void {
  }

  public filterMedia(): void{
    this.onSelectedItem.emit(this.selectedItems);
  }
}
