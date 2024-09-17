import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ToastrService} from "ngx-toastr";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  constructor(private toastrService: ToastrService, private authService: AuthService) {
    this.toastrService = toastrService;
  }

  onSubmit() {
    console.log(this.changePasswordForm.value);
    if (!this.changePasswordForm.valid) {
      this.toastrService.error('Please fill all the fields', 'Invalid Form');
      return
    }
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.toastrService.error('New password and confirm password do not match', 'Password Mismatch');
      return
    }
    if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.currentPassword) {
      this.toastrService.error('New password cannot be same as current password', 'Password Mismatch');
      return
    }
    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (response: any) => {
        this.toastrService.success('Password changed successfully', 'Success');
      },
      error: (error: any) => {
        this.toastrService.error(error.error.message, 'Error');
      }
    })
  }

}
