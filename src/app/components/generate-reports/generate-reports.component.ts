import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ToastrService} from "ngx-toastr";
import {BatchService} from "../../services/batch.service";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-generate-reports',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButton,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatIcon,
    MatIconButton,
    MatStartDate,
    MatSuffix,
    MatTooltip
  ],
  templateUrl: './generate-reports.component.html',
  styleUrl: './generate-reports.component.scss'
})
export class GenerateReportsComponent {

  constructor(private batchService: BatchService, private toastrService: ToastrService, public dialogRef: MatDialogRef<GenerateReportsComponent>) {}
  reportsForm = new FormGroup({
    'startDate': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'endDate': new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    'email': new FormControl('', {validators: [Validators.required, Validators.email]})
  })

  onSubmit() {
    const startDate  = this.reportsForm.value.startDate || "";
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-GB");
    const endDate = this.reportsForm.value.endDate || "";
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-GB");
    if (this.reportsForm.valid) {
      this.batchService.generateReport(formattedStartDate, formattedEndDate, this.reportsForm.value.email || "").subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastrService.success('Report is being generated. You will receive an email shortly', 'Report');
          this.dialogRef.close();
        },
        error: (error: any) => {
          console.log(error);
          this.toastrService.error('Error generating report. Please contact administrator to fix the issue', 'Error');
        }
      });
    } else {
      console.log(this.reportsForm.valid);
      this.toastrService.error('Please fill in all the fields', 'Form Error');
    }
  }
}
