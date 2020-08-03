import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, Currency, ClientSAP, VotingElement } from '../_models/ocrd';
import { Bpupdatemodel } from '../_models/bpupdatemodel';

@Injectable({
  providedIn: 'root'
})
export class BusinesspartnerService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCurrList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.baseUrl + 'BusinessPartner/getcurrlist');
  }

  getCountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl + 'BusinessPartner/getcountrylist');
  }

  getStateList(city): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl + 'BusinessPartner/getstatelist/' + city);
  }

  getClientList(): Observable<ClientSAP[]> {
    return this.http.get<ClientSAP[]>(this.baseUrl + 'BusinessPartner/getclientlist');
  }

  postbpMaster(model: any) {
    return this.http.post(this.baseUrl + 'BusinessPartner/postbpmaster', model);
  }

  getVotingReportData(fromdate:any,todate:any,status): Observable<VotingElement[]> {
    return this.http.get<VotingElement[]>(this.baseUrl + 'voting/getvotingresult?fromdate='+fromdate+'&todate='+todate+'&status='+status);
  }

  getSelectedBP(CardCode): Observable<Bpupdatemodel> {
    return this.http.get<Bpupdatemodel>(this.baseUrl + 'BusinessPartner/getSelectedBP/' + CardCode);
  }

}
