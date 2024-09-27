import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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

  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) {

  }

  login() {
   const auth = this.authForm.value;
   this.authService.login(auth?.email, auth?.password).subscribe({
     next: (response: any) => {
       if (response.email) {
         localStorage.setItem('token', JSON.stringify({isAuthenticated: true, email: response.email, id: response.id}));
       }
       this.router.navigate(['/dashboard']);
     },
      error: (error: any) => {
       this.toastrService.error(error.error.message, 'Login Error');
      }
   })
  }
}
