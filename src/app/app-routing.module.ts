import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validate-token.guard';
import { NotFoundComponent } from './misc/page/not-found/not-found.component';

const routes: Routes = [
  {
    path:'auth', 
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'media', 
    loadChildren:()=> import('./media/media.module').then(m => m.MediaModule), 
    canActivate: [ ValidarTokenGuard],
    canLoad: [ ValidarTokenGuard],
  },
  {
    path:'', 
    redirectTo:'auth', 
    pathMatch:'full'
  },
  {
    path:'**', 
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash:false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
