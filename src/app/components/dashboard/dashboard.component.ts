import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {FormControl, FormGroup, FormsModule} from "@angular/forms";
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
  MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatTooltip} from "@angular/material/tooltip";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {MAT_DATE_LOCALE, MatRipple, provideNativeDateAdapter} from "@angular/material/core";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {GenerateReportsComponent} from "../generate-reports/generate-reports.component";

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
    MatRipple,
    MatPaginator,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatStartDate,
    MatEndDate,
    MatDatepickerModule,
    MatSuffix,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatDivider
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dialog = inject(MatDialog);
  batchNumber: string = "";
  quantity: number | undefined;
  masterCertificate: any = null;
  jungCSV: any = null;
  masterCertificateFileName: string = "";
  jungCSVFileName: string = "";
  calibrationDate: string = "";
  batches: MatTableDataSource<unknown, MatPaginator> = new MatTableDataSource();
  displayedColumns: any[] = ["batchNumber", "quantity", "calibrationDate", "inspector", "masterCertificate", "jungCSV", "areteBatchNumber"];
  startDate: string | undefined;
  endDate: string | undefined;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.batches.paginator = this.paginator;
    this.batches.sort = this.sort;
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
        this.loadAllBatches();
        console.log(response);
        this.dialog.open(ReviewCertificateComponent, {data: response?.data[0]?.content});
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
        next: () => {
          this.toastrService.success('Jung CSV uploaded successfully', 'Success');
          this.loadAllBatches();
        },
        error: (error: any) => {
          this.toastrService.error(`${error.error.message}`, 'Error uploading Jung CSV');
          console.log();
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
        this.batchNumber = " ";
        this.quantity = 0;
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
      this.batches.data = response;
    })
  }

  logout() {
    this.authService.logout();
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.batches.filter = filterValue.trim().toLowerCase();
  }

  generateReport() {
    this.dialog.open(GenerateReportsComponent, {panelClass: "dialog-responsive"});
  }
}
