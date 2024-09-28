import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import environment from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewCertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(batchId: string) {
    return this.http.get(`${environment.apiBaseUrl}/api/review/${batchId}`);
  }

  getAllBatches() {
    const inspectorId = JSON.parse(<string>localStorage.getItem('token')).id;
    return this.http.get(`${environment.apiBaseUrl}/api/batch/${inspectorId}`);
  }
}
