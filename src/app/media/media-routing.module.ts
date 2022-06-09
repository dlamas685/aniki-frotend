import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogMediaComponent } from './page/catalog-media/catalog-media.component';
import { DetailMediaComponent } from './page/detail-media/detail-media.component';
import { FavoriteMediaComponent } from './page/favorite-media/favorite-media.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    children: [
      {path:'catalog', component: CatalogMediaComponent },
      {path:'detail/:id', component:DetailMediaComponent},
      {path:'favorite', component: FavoriteMediaComponent},
      {path:'**', redirectTo:'catalog'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MediaRoutingModule { }
