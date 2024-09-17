import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewCertificateService {

  constructor(private http: HttpClient) { }

  getCertificateData(batchId: string) {
    return this.http.get(`https://ec2-15-207-14-9.ap-south-1.compute.amazonaws.com:3000/api/review/${batchId}`);
  }

  getAllBatches() {
    const inspectorId = localStorage.getItem('inspectorId');
    return this.http.get(`https://ec2-15-207-14-9.ap-south-1.compute.amazonaws.com:3000/api/batch/${inspectorId}`);
  }
}
