import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { EditDataComponent } from './page/edit-data/edit-data.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './page/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { HomeComponent } from './page/home/home.component';



@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    EditDataComponent,
    ResetPasswordComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  exports: [
    LoginComponent,
    SigninComponent,
  ]
})
export class AuthModule { }
