import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styles: [
  ]
})
export class EditDataComponent implements OnInit {
  
  username:string = "";
  email:string = "";
  name: string = "";
  password:string = "";
  password_2:string = "";
  checked:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
