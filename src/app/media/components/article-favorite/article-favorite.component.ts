import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'app-article-favorite',
  templateUrl: './article-favorite.component.html',
  styles: [
    `
    .banner-img {
      width:100%;
      height:100%;
      max-height:50px;
      display: inline-block;
      object-fit: cover;
      object-position: 20% 10%; 
    }
    
    `
  ]
})
export class ArticleFavoriteComponent implements OnInit {

  @Output() onUpdateFavorite: EventEmitter<Media> = new EventEmitter();
  @Input() media!:Media;

  constructor() { }

  ngOnInit(): void {
  }

  public updateFavorite():void {
    this.onUpdateFavorite.emit(this.media);
  }

}
