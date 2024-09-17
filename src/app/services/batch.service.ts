import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  createBatch(batch: any) {
    console.log(batch);
    return this.http.post('http://ec2-15-207-14-9.ap-south-1.compute.amazonaws.com/api/batch', batch, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  uploadBatchFiles(files: any, batchPK: string) {
    let form = new FormData();
    form.append('master_certificate', files.masterCertificate);
    form.append('jung_csv', files.jungCSV);
    return this.http.post(`http://ec2-15-207-14-9.ap-south-1.compute.amazonaws.com/api/batch/files/${batchPK}`, form, {
    });
  }
}
