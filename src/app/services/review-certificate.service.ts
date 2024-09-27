import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewCertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(batchId: string) {
    return this.http.get(`http://13.201.79.100:3000/api/review/${batchId}`);
  }

  getAllBatches() {
    const inspectorId = JSON.parse(<string>localStorage.getItem('token')).id;
    return this.http.get(`http://13.201.79.100:3000/api/batch/${inspectorId}`);
  }
}
