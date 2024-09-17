import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      if (res.email) {
        localStorage.setItem('token', JSON.stringify({isAuthenticated: true, email: res.email}));
      }
      this.router.navigate(['/dashboard']);
    })
  }
}
