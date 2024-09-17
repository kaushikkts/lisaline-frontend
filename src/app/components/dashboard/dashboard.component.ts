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
  batchId: string = "";
  quantity: number | undefined;
  masterCertificate: any = null;
  jungCSV: any = null;
  masterCertificateFileName: string = "";
  jungCSVFileName: string = "";
  inspectorName: string = "";
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

  uploadMasterCertificate(event: any) {
    if (event.target.files[0]["type"] !== 'application/pdf') {
      console.log('Please upload a PDF file');
      return;
    }
    console.log(event.target.files[0]);
    this.masterCertificate = event.target.files[0];
    this.masterCertificateFileName = event.target.files[0].name;
  }

  uploadJungCSV(event: any) {
    console.log(event.target.files[0]);
    this.jungCSV = event.target.files[0];
    this.jungCSVFileName = event.target.files[0].name;
  }

  createBatch() {
    console.log('Creating batch');
    console.log(
      this.batchId,
      this.calibrationDate,
      this.quantity,
      this.masterCertificate,
      this.jungCSV
    )
    if (
      this.batchId &&
      this.quantity &&
      this.masterCertificate
    ) {
      let masterCertificateForm = new FormData();
      let jungCSVForm = new FormData();
      masterCertificateForm.append('masterCertificate', this.masterCertificate);
      jungCSVForm.append('jungCSV', this.jungCSV);
      const batch = {
        batchId: this.batchId,
        calibrationDate: this.calibrationDate,
        quantity: this.quantity,
        inspectorName: this.inspectorName
      }
      const files = {
        masterCertificate: this.masterCertificate,
        jungCSV: this.jungCSV,
      }
      this.batchService.createBatch(batch).subscribe((response: any) => {
        let id = response[0]?.id;
        this.batchService.uploadBatchFiles(files, id).subscribe((data: any) => {
          this.dialog.open(ReviewCertificateComponent, {data: data});
        })
      })
    } else {
      console.log('Please fill all the fields');
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
