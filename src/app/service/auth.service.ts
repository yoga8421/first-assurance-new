import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loggedToken: BehaviorSubject<any> = new BehaviorSubject<any>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isloggedToken() {
    return this.loggedToken.asObservable();
  }
  constructor(private http: HttpClient) { } 

  login() {
    this.http.post('url', { username: null, password: null}, { headers: this.headers });
  }
  UserToken(newUserToken: any) {
    this.loggedToken.next(newUserToken);
  }

  logout() {
    this.loggedIn.next(false);
  }
}
