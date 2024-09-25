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
    NgForOf
  ],
  templateUrl: './review-certificate.component.html',
  styleUrl: './review-certificate.component.scss'
})
export class ReviewCertificateComponent implements OnInit {
  reviewCertificateData: any;
  tempValidation: FormArray<any> = new FormArray<any>([]);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    console.log(data);
  }
  form = new FormGroup({
    productDetails: new FormGroup({
      name: new FormControl('test'),
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
    this.reviewCertificateData = this.data;
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


  get temperatureValidationValues() {
    let test = this.form.get('temperatureValidation') as FormArray;


    return this.form.get('temperatureValidation') as FormArray;
  }
  submitChanges() {
    console.log(this.form.value);
  }

  protected readonly JSON = JSON;

  setPointChanged(element: any) {
    console.log(element);
  }
}
