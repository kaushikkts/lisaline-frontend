import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.router = router;
  }

  login(email: ɵValue<FormControl<string | null>> | undefined, password: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post('http://localhost:3000/api/login', {email: email, password: password});
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  changePassword(changePasswordBody: any) {
    console.log(changePasswordBody);
    const email = JSON.parse(<string>localStorage.getItem('token')).email;
    return this.http.post('http://localhost:3000/api/change-password', {
      email: email,
      currentPassword: changePasswordBody.currentPassword,
      newPassword: changePasswordBody.newPassword
    });
  }

  isLoggedIn() {
    console.log(JSON.parse(<string>localStorage.getItem('token')));
    if (!localStorage.getItem('token')) {
      return false;
    }
    return JSON.parse(<string>localStorage.getItem('token')).isAuthenticated;
  }
}
