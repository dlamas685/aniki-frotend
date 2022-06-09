import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, map, delay } from 'rxjs/operators';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserService implements AsyncValidator {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http:HttpClient
  ) { }

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const username = control.value;
    const url = `${this.baseUrl}/auth/user`;
    const params = new HttpParams().set('username', username);
    return this.http.get<AuthResponse>(url, {params}).pipe(
      map( resp => resp.success ? null : {userExist: true}),
      // delay(1000)
    );
  }
}
