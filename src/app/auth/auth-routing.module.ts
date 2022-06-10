import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SigninComponent } from './page/signin/signin.component';
import { HomeComponent } from './page/home/home.component';


const routes:Routes = [
  {
    path: '',
    component:HomeComponent,
    children: [
      {path:'login', component: LoginComponent},
      {path:'signin', component: SigninComponent},
      {path:'**',  redirectTo:'login'}
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
export class AuthRoutingModule { }
