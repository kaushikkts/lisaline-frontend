import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-review-certificate',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './review-certificate.component.html',
  styleUrl: './review-certificate.component.scss'
})
export class ReviewCertificateComponent {
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
      calibrationDate: new FormControl(''),
      serialNumber: new FormControl(''),
      accuracy: new FormControl(''),
    }),
    temperatureAndHumidity: new FormGroup({
      temperature: new FormControl(''),
      humidity: new FormControl(''),
    }),
    temperatureValidation: new FormArray([])
  });
}
