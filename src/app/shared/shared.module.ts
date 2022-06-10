import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
