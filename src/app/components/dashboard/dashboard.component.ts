import {Component, inject, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import { FormsModule } from "@angular/forms";
import {BatchService} from "../../services/batch.service";
import {DatePipe} from "@angular/common";
import {ReviewCertificateService} from "../../services/review-certificate.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ReviewCertificateComponent} from "../review-certificate/review-certificate.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatRow,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatTooltip} from "@angular/material/tooltip";
import {ToastrService} from "ngx-toastr";
import {LogoutService} from "../../services/logout.service";
import {AuthService} from "../../services/auth.service";
import {MatRipple} from "@angular/material/core";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatIconButton,
    MatButton,
    MatDialogModule,
    RouterLink,
    MatMiniFabButton,
    MatFabButton,
    MatFormField,
    MatInput,
    FormsModule,
    DatePipe,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatTableModule,
    MatTooltip,
    MatLabel,
    MatRipple
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dialog = inject(MatDialog);
  batchNumber: string = "";
  quantity: number | undefined;
  masterCertificate: any = null;
  jungCSV: any = null;
  masterCertificateFileName: string = "";
  jungCSVFileName: string = "";
  calibrationDate: string = "";
  batches: any[] = [];
  displayedColumns: any[] = ["batchNumber", "quantity", "calibrationDate", "inspector", "masterCertificate", "jungCSV", "areteBatchNumber"];

  constructor(
    private batchService: BatchService,
    private reviewService: ReviewCertificateService,
    private toastrService: ToastrService,
    private authService: AuthService) {
    this.batchService = batchService;
    this.reviewService = reviewService;
    this.toastrService = toastrService;
    this.authService = authService;

  }

  ngOnInit() {
    this.loadAllBatches();
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0])
    this.toastrService.info('Uploading file');
    if (event.target.files[0]["type"] === 'application/vnd.ms-excel') {
      this.jungCSV = event.target.files[0];
      this.jungCSVFileName = event.target.files[0].name;
      this.calibrationDate = this.jungCSVFileName.split('_').join(',').split('.')[0].split(',')[1];
    }
    if (event.target.files[0]["type"] === 'application/pdf') {
      this.masterCertificate = event.target.files[0];
      this.masterCertificateFileName = event.target.files[0].name;
    }
  }

  uploadMasterCertificate(event: any, element: any) {
    if (event.target.files[0]["type"] !== 'application/pdf') {
      this.toastrService.error('Please upload a PDF file', 'Invalid File Type');
      return;
    }
    this.masterCertificate = event.target.files[0];
    this.masterCertificateFileName = event.target.files[0].name;
    this.toastrService.info(`Uploading Master Certificate ${this.masterCertificateFileName}`);
    this.batchService.uploadMasterCertificate(this.masterCertificate, element?.id).subscribe({
      next: (response: any) => {
        this.toastrService.success('Master Certificate uploaded successfully', 'Success');
        console.log(response);
      },
      error: (error: any) => {
        this.toastrService.error('Error uploading Master Certificate', 'Error');
        console.log(error);
      }
    })
    console.log(`Value of element : - ${element?.id}`);
  }

  uploadJungCSV(event: any, element: any) {
    if (event.target.files[0]["type"] === 'application/vnd.ms-excel') {
      const jungCSV = event.target.files[0];
      const jungCSVFileName = event.target.files[0].name;
      this.calibrationDate = this.jungCSVFileName.split('_').join(',').split('.')[0].split(',')[1];
      this.toastrService.info(`Uploading Jung CSV ${jungCSVFileName}`);
      this.batchService.uploadJungCSV(jungCSV, element?.id).subscribe({
        next: (response: any) => {
          this.toastrService.success('Jung CSV uploaded successfully', 'Success');
          console.log(response);
        },
        error: (error: any) => {
          this.toastrService.error('Error uploading Jung CSV', 'Error');
          console.log(error);
        }
      })
    } else {
      this.toastrService.error('Please upload a CSV file', 'Invalid File Type');
      return;
    }
  }

  createBatch() {
    console.log('Creating batch');
    console.log(
      this.batchNumber,
      this.quantity,
    )
    if (
      this.batchNumber &&
      this.quantity
    ) {
      let masterCertificateForm = new FormData();
      let jungCSVForm = new FormData();
      masterCertificateForm.append('masterCertificate', this.masterCertificate);
      jungCSVForm.append('jungCSV', this.jungCSV);
      const batch = {
        batchNumber: this.batchNumber,
        calibrationDate: this.calibrationDate,
        quantity: this.quantity,
      }
      // const files = {
      //   masterCertificate: this.masterCertificate,
      //   jungCSV: this.jungCSV,
      // }
      this.batchService.createBatch(batch).subscribe((response: any) => {
        this.toastrService.success('Batch created successfully', 'Success');
        this.loadAllBatches();
        // let id = response[0]?.id;
        // this.batchService.uploadBatchFiles(files, id).subscribe((data: any) => {
        //   this.dialog.open(ReviewCertificateComponent, {data: data});
        // })
      })
    } else {
      this.toastrService.error('Please fill all the fields', 'Invalid Form');
    }
  }

  loadAllBatches() {
    this.reviewService.getAllBatches().subscribe((response: any) => {
      this.batches = response;
      console.log(response)
    })
  }

  logout() {
    this.authService.logout();
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }
}
