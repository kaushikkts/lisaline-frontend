import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ReviewBatchService} from "../../services/review-batch.service";
import {ToastrService} from "ngx-toastr";
import {BatchService} from "../../services/batch.service";
import {ReviewCertificateService} from "../../services/review-certificate.service";

@Component({
  selector: 'app-review-batch',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './review-batch.component.html',
  styleUrl: './review-batch.component.scss'
})
export class ReviewBatchComponent implements OnInit {
  batchForm = new FormGroup({
    'remarks': new FormControl(''),
    'areteBatchNumber': new FormControl(''),
    'quantity': new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    'id': new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private reviewBatchService: ReviewBatchService, private toastrService: ToastrService,
              public dialogRef: MatDialogRef<ReviewBatchComponent>) {}

  ngOnInit() {
    this.batchForm = new FormGroup({
      'remarks': new FormControl(this.data.remarks),
      'areteBatchNumber': new FormControl(this.data.areteBatchNumber),
      'quantity': new FormControl(this.data.quantity, [Validators.pattern(/^[0-9]*$/)]),
      'id': new FormControl(this.data.id)
    })

  }

  submitChanges() {
    this.reviewBatchService.updateBatch(this.batchForm.value).subscribe({
      next: (response) => {
        this.toastrService.success('Batch updated successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        this.toastrService.error('Error updating batch');
      }
    })
  }
}
