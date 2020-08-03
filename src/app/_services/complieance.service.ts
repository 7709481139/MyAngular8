import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComplienceHeader, CompSubject,CompType, SAPUsers, StatusList, ContactPerson } from '../_models/complienceHeader';

@Injectable({
  providedIn: 'root'
})
export class ComplieanceService {

  baseUrl = environment.apiUrl;
  StageID: number;
  SubjectID: number;
  CompliancesCardCode: string;
  constructor(private http: HttpClient) { }

  GetComplianceList(cardcode): Observable<ComplienceHeader[]> {
    return this.http.get<ComplienceHeader[]>(this.baseUrl + 'Complieance/getcompliancelist/' + cardcode);
  }

  GetSubjectList(): Observable<CompSubject[]> {
    return this.http.get<CompSubject[]>(this.baseUrl + 'Complieance/getsubjectlist');
  }
  GetTypeList(): Observable<CompType[]> {
    return this.http.get<CompType[]>(this.baseUrl + 'Complieance/gettypelist');
  }

  GetSAPUsersList(): Observable<SAPUsers[]> {
    return this.http.get<SAPUsers[]>(this.baseUrl + 'Complieance/getsapuserlist');
  }

  GetContactPersonList(cardcode): Observable<ContactPerson[]> {
    return this.http.get<ContactPerson[]>(this.baseUrl + 'Complieance/getclientcontactperson/' + cardcode);
  }

  GetComplienceStatusList(): Observable<StatusList[]> {
    return this.http.get<StatusList[]>(this.baseUrl + 'Complieance/getstatuslist');
  }

  postSingleStageActivity(model: any) {
    return this.http.post(this.baseUrl + 'Complieance/CreateSingleActivity', model);
  }


  DownloadFile(model: any) {
    return this.http.post(this.baseUrl + 'Complieance/DownloadFile', model, { responseType: 'blob' });
  }


  // DownloadFile(model: any, fileType: string): Observable<Blob> {
  //   const fileExtension = fileType;
  //   return this.http.post(this.baseUrl + 'Complieance/DownloadAttachment', model,
  //   { responseType: 'blob' })
  //   .map(
  //     (res) => {
  //           const blob = new Blob([res.blob()], {type: fileExtension} )
  //           return blob;
  //     });
  // }


  


}
