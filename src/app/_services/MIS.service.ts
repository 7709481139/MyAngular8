import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MISData } from '../_models/MIS-Data';

@Injectable({
  providedIn: 'root'
})
export class MISService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitMISData(model: any) {
    return this.http.post(this.baseUrl + 'MIS/postmisdata', model);
  }

  GetMISReport(Type): Observable<MISData[]> {
    return this.http.get<MISData[]>(this.baseUrl + 'MIS/GetMISReport/' + Type);
  }

}
