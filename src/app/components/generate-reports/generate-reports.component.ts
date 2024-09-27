import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
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

  constructor(private batchService: BatchService, private toastrService: ToastrService) {}
  reportsForm = new FormGroup({
    'startDate': new FormControl(''),
    'endDate': new FormControl(''),
    'email': new FormControl('')
  })

  onSubmit() {
    console.log(this.reportsForm.value);
    // if (this.reportsForm.valid) {
    //   this.batchService.generateReport(this.startDate, this.endDate).subscribe({
    //     next: (response: any) => {
    //       console.log(response);
    //       this.toastrService.success('Report is being generated. You will receive an email shortly', 'Report');
    //     },
    //     error: (error: any) => {
    //       this.toastrService.error('Error generating report. Please contact administrator to fix the issue', 'Error');
    //     }
    //   });
    // } else {
    //   this.toastrService.error('Please select start and end date', 'Invalid Date Range');
    // }
  }
}
