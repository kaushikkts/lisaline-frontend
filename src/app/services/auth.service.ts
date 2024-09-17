import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.router = router;
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/login', {email: email, password: password});
  }
  logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);

  }
  isLoggedIn() {
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      return false;
    }
    return JSON.parse(<string>localStorage.getItem('token')).isAuthenticated;
  }
}
