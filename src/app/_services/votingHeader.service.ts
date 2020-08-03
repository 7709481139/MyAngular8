import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocrd } from '../_models/ocrd';


@Injectable({
  providedIn: 'root'
})

export class VotingHeaderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getBPList(): Observable<Ocrd[]> {
    return this.http.get<Ocrd[]>(this.baseUrl + 'voting/getbplist');
  }

  postVotingActivity(model: any) {
    return this.http.post(this.baseUrl + 'voting/createvotingheader', model);
  }

}
