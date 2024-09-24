import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewCertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(batchId: string) {
    return this.http.get(`https://65.20.79.92.nip.io/api/review/${batchId}`);
  }

  getAllBatches() {
    const inspectorId = JSON.parse(<string>localStorage.getItem('token')).id;
    return this.http.get(`https://65.20.79.92.nip.io/api/batch/${inspectorId}`);
  }
}
