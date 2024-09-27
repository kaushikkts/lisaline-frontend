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
    batch = {...batch, inspector: JSON.parse(<string>localStorage.getItem('token')).id};
    console.log(batch)
    return this.http.post('http://13.201.79.100:3000/api/batch', batch, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  uploadMasterCertificate(file: any, batchPK: string) {
    let form = new FormData();
    form.append('master_certificate', file);
    return this.http.post(`http://13.201.79.100:3000/api/batch/files/${batchPK}`, form, {
    });
  }

  uploadJungCSV(file: any, batchPK: string) {
    let form = new FormData();
    form.append('jung_csv', file);
    return this.http.post(`http://13.201.79.100:3000/api/batch/files/${batchPK}`, form, {
    });
  }

  generateReport(startDate: string, endDate: string) {
    return this.http.post('http://13.201.79.100:3000/api/report', {startDate, endDate});
  }
}
