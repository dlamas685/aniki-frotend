import { Component, Input, OnInit } from '@angular/core';
import { CharacterEdge } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styles: [
  ]
})
export class CharacterCardComponent implements OnInit {

  @Input() character!: CharacterEdge;


  constructor() { }

  ngOnInit(): void {
  }

}
