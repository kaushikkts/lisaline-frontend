import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

 authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
 })

  constructor(private router: Router, private authService: AuthService) {
  }

  login() {
   console.log(this.authForm.value);
   const auth = this.authForm.value;
   console.log(auth?.email, auth?.password);
    this.authService.login(auth?.email, auth?.password).subscribe((res: any) => {
      if (res.email) {
        localStorage.setItem('token', JSON.stringify({isAuthenticated: true, email: res.email}));
      }
      this.router.navigate(['/dashboard']);
    })
  }
}
