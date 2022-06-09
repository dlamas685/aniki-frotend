import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaSort } from '../../interfaces/media.enum';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styles: [
  ]
})
export class SelectButtonComponent implements OnInit {

  stateOptions: any[] = [];

  optionSelected: MediaSort = MediaSort.Popularity_Desc;

  @Output() onSortMedia: EventEmitter<MediaSort[]> = new EventEmitter();

  constructor() {
    this.stateOptions = [{label: 'Titulo', value: MediaSort.Title_Romaji,icon: 'fa-solid fa-arrow-up-a-z'}, {label: 'Popular', value: MediaSort.Popularity_Desc,icon: 'fa-solid fa-arrow-up-wide-short'}];
   }

  ngOnInit(): void {
  }

  public orderMedia(): void {
    let sort:MediaSort[] = [this.optionSelected];
    this.onSortMedia.emit(sort);
  } 


}
