import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogContent} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ReviewCertificateService} from "../../services/review-certificate.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-review-certificate',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatDialogContent,
    FormsModule,
    NgForOf,
    MatButton
  ],
  templateUrl: './review-certificate.component.html',
  styleUrl: './review-certificate.component.scss'
})
export class ReviewCertificateComponent implements OnInit {
  reviewCertificateData: any;
  tempValidation: FormArray<any> = new FormArray<any>([]);
  constructor(@Inject(MAT_DIALOG_DATA) public uploadedCertificateData: any,
              private formBuilder: FormBuilder,
              private reviewCertificateService: ReviewCertificateService,
              private toastrService: ToastrService
  ) {}
  form = new FormGroup({
    productDetails: new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      resolution: new FormControl(''),
      range: new FormControl(''),
    }),
    referenceInstrumentation: new FormGroup({
      model: new FormControl(''),
      brand: new FormControl(''),
      serialNumber: new FormControl(''),
      accuracy: new FormControl(''),
    }),
    temperatureValidation: this.formBuilder.array([])
  });
  temperatureValidationColumns: string[] = ['setPoints', 'deviation', 'result'];

  ngOnInit() {
    this.reviewCertificateData = this.uploadedCertificateData?.data[0]?.content;
    for (let i = 0; i < this.reviewCertificateData?.temperatureValidation.length; i++) {
      this.tempValidation.push(new FormGroup({
        setPoints: new FormControl(this.reviewCertificateData?.temperatureValidation[i].setPoints),
        deviation: new FormControl(this.reviewCertificateData?.temperatureValidation[i].deviation),
        result: new FormControl(this.reviewCertificateData?.temperatureValidation[i].result),
      }));
    }
    console.log(this.reviewCertificateData, this.reviewCertificateData?.certificateData);
    this.form = new FormGroup({
      productDetails: new FormGroup({
        name: new FormControl(this.reviewCertificateData?.productDetails.name),
        type: new FormControl(this.reviewCertificateData?.productDetails.type),
        resolution: new FormControl(this.reviewCertificateData?.productDetails.resolution),
        range: new FormControl(this.reviewCertificateData?.productDetails.range),
      }),
      referenceInstrumentation: new FormGroup({
        model: new FormControl(this.reviewCertificateData?.referenceInstrumentation.model),
        brand: new FormControl(this.reviewCertificateData?.referenceInstrumentation.brand),
        serialNumber: new FormControl(this.reviewCertificateData?.referenceInstrumentation.serialNumber),
        accuracy: new FormControl(this.reviewCertificateData?.referenceInstrumentation.accuracy),
      }),
      temperatureValidation: this.tempValidation
    });
  }

  submitChanges() {
    console.log(this.form.value);
    this.reviewCertificateService.updateCertificateData(this.form.value, this.uploadedCertificateData?.batchId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastrService.success('Certificate updated successfully');
      },
      error: (error: any) => {
        console.log(error);
        this.toastrService.error(`Error updating certificate: ${error.error.message}`);
      }
    });

  }

}
