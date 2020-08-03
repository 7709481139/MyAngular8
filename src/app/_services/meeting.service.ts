import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Meeting, SingleMeeting } from '../_models/Meeting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  CreateBoardMeeting(model: any) {
    return this.http.post(this.baseUrl + 'meeting/CreateBoardMeeting', model);
  }

  submitWeeklyMeeting(model: any) {
    return this.http.post(this.baseUrl + 'meeting/submitWeeklyMeeting', model);
  }

  getMeetingList(cntctType): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.baseUrl + 'meeting/getMeetingData/' + cntctType);
  }

  GetSelectedMeetingData(clgCode): Observable<SingleMeeting> {
    return this.http.get<SingleMeeting>(this.baseUrl + 'meeting/GetSelectedMeetingData/' + clgCode);
  }


}
