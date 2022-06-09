import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../interfaces/media.interface';

@Component({
  selector: 'app-article-media',
  templateUrl: './article-media.component.html',
  styleUrls: ['./article-media.component.css']
})
export class ArticleMediaComponent implements OnInit {

  public skeletonData:boolean = true;
  @Input() media!:Media;
  @Input() bgCard:string = 'bg-bluegray-100 shadow-none animate__animated animate__fadeIn animate__fast';


  constructor() { }

  ngOnInit(): void {
    this.skeleton();
  }

  skeleton(): boolean {
    this.skeletonData = true;
    setTimeout(() => {
      this.skeletonData = false;
    }, 800);
    return this.skeletonData;
  }
}
