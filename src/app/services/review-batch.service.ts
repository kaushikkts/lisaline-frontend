import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import environment from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewBatchService {

  constructor(private http: HttpClient) { }

  updateBatch(batchData: any) {
    console.log(batchData);
    return this.http.post(`${environment.apiBaseUrl}/api/update-batch`, batchData);
  }
}
