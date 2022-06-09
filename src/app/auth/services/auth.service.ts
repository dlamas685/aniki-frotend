import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { map, catchError, tap } from 'rxjs/operators';
import { Media } from 'src/app/media/interfaces/media.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  
  private _user: User = {};

  get user():User {
    return {...this._user};
  }
  
  constructor(private http: HttpClient) { }

  public createUser(user:User): Observable<AuthResponse> {
    const url = `${this._baseUrl}/auth/new`;
    const body = user;
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.success){
          sessionStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => ({success: resp.success, msg:resp.msg})),
      catchError(err => of(err.error))
    );
  }

  public loginUser(user:User): Observable<AuthResponse> {
    const url = `${this._baseUrl}/auth`;
    const body = user;
    return this.http.post<AuthResponse>(url,body).pipe(
      tap(resp => {
        if (resp.success){
          this.logoutUser();
          sessionStorage.setItem('token', resp.token!);
        }
      }),
      map(resp => ({success: resp.success, msg:resp.msg})),
      catchError(err => of(err.error))
    );
  }
  
  public logoutUser(){
    sessionStorage.clear();
  }

  public validateToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map((resp)=>{
        this._user = {
          id: resp.id!,
          username: resp.username!,
          name: resp.name!,
          email: resp.email!
        }
        return resp.success!;
      }),
      catchError(err => of(false))
    );
  }


}
