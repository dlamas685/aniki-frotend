import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authSvc: AuthService,
    private router: Router
    ){}

  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.validateToken().pipe(
      tap(resp => {
        if (!resp) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authSvc.validateToken().pipe(
      tap(resp => {
        if (!resp) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
