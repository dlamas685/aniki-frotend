import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MediaRoutingModule } from './media-routing.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { CatalogMediaComponent } from './page/catalog-media/catalog-media.component';
import { DetailMediaComponent } from './page/detail-media/detail-media.component';
import { FavoriteMediaComponent } from './page/favorite-media/favorite-media.component';
import { HomeComponent } from './page/home/home.component';
import { InputFilterComponent } from './components/input-filter/input-filter.component';
import { MultiselectFilterComponent } from './components/multiselect-filter/multiselect-filter.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
// import { YouTubePlayerModule } from '@angular/youtube-player';
import { ArticleMediaComponent } from './components/article-media/article-media.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { DataMediaComponent } from './components/data-media/data-media.component';
import { SafePipe } from './pipes/safe.pipe';
import { ArticleFavoriteComponent } from './components/article-favorite/article-favorite.component';
import { DataCustomPipe } from './pipes/data-custom.pipe';


@NgModule({
  declarations: [
    CatalogMediaComponent,
    DetailMediaComponent,
    FavoriteMediaComponent,
    HomeComponent,
    InputFilterComponent,
    MultiselectFilterComponent,
    SelectButtonComponent,
    SelectFilterComponent,
    DataMediaComponent,
    ArticleMediaComponent,
    CharacterCardComponent,
    SafePipe,
    ArticleFavoriteComponent,
    DataCustomPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MediaRoutingModule,
    InfiniteScrollModule,
    PrimeNGModule,
    SharedModule,
    // YouTubePlayerModule
  ],
  exports: [
    CatalogMediaComponent,
    DetailMediaComponent,
    FavoriteMediaComponent,
    HomeComponent
  ]
})
export class MediaModule { }
