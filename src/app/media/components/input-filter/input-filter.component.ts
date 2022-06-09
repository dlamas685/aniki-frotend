import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styles: [
  ]
})
export class InputFilterComponent implements OnInit {


  @Input() input_name: string = '';
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer:Subject<string> = new Subject();

  
  @Input() search:string = '';

  constructor() { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor =>{
      this.onDebounce.emit(valor);
    })
  }

  public searchMedia():void {
    this.debouncer.next(this.search);
  }

}
