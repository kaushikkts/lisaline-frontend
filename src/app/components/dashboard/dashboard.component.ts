import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import { FormsModule } from "@angular/forms";
import {BatchService} from "../../services/batch.service";
import {DatePipe} from "@angular/common";
import {ReviewCertificateService} from "../../services/review-certificate.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatIconButton,
    MatButton,
    RouterLink,
    MatMiniFabButton,
    MatFabButton,
    MatFormField,
    MatInput,
    FormsModule,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  batchId: string = "";
  quantity: number | undefined;
  masterCertificate: any = null;
  jungCSV: any = null;
  masterCertificateFileName: string = "";
  jungCSVFileName: string = "";
  inspectorName: string = "";
  calibrationDate: string = "";

  constructor(private batchService: BatchService, private reviewService: ReviewCertificateService) {
    this.batchService = batchService;
    this.reviewService = reviewService;
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0])

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
      this.masterCertificate &&
      this.jungCSV &&
      this.calibrationDate
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
          console.log(data);
          // this.reviewService.getCertificateData(id).subscribe((certificateJSONData: any) => {
          //   console.log(certificateJSONData);
          // })
        })
      })
    } else {
      console.log('Please fill all the fields');
    }
  }
}
