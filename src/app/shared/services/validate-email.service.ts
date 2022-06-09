import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService implements AsyncValidator{

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  validate(control: AbstractControl):Observable<ValidationErrors | null> {
    const email = control.value;
    const url = `${this.baseUrl}/auth/user`;
    const params = new HttpParams().set('email', email);
    return this.http.get<AuthResponse>(url, {params}).pipe(
      map( resp => resp.success ? null : {emailExist: true}),
      // delay(1000)
    );
  }
}
