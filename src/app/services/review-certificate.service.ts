import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import environment from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewCertificateService {

  constructor(private http: HttpClient) { }

  updateCertificateData(certificate: any, batchId: string) {
    return this.http.put(`${environment.apiBaseUrl}/api/update-certificate-data/${batchId}`, certificate);
  }

  getAllBatches() {
    const inspectorId = JSON.parse(<string>localStorage.getItem('token')).id;
    return this.http.get(`${environment.apiBaseUrl}/api/batch/${inspectorId}`);
  }
}
