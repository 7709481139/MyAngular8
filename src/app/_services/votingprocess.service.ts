import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dovoting } from '../_models/Dovoting';

@Injectable({
  providedIn: 'root'
})
export class VotingprocessService {
  baseUrl = environment.apiUrl;
  userid = localStorage.getItem('userid');
  constructor(private http: HttpClient) { }

  getVotingSubList(): Observable<Dovoting[]> {
    return this.http.get<Dovoting[]>(this.baseUrl + 'voting/getactivitis/' + this.userid);
  }

  postSingleVote(model: any) {
    return this.http.post(this.baseUrl + 'voting/postsinglevoting', model);
  }
}
