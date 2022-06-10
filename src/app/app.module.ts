import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import localeES from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { NotFoundComponent } from './misc/page/not-found/not-found.component';
registerLocaleData(localeES);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [{ provide:LOCALE_ID, useValue:'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
