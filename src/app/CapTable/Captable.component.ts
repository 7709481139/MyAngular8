import { Component, OnInit } from '@angular/core';

import { ComplieanceService } from 'src/app/_services/complieance.service';
import { ComplienceHeader, CompSubject, SAPUsers, StatusList, Priority, ContactPerson } from 'src/app/_models/complienceHeader';
import { Ocrd } from '../_models/ocrd';
import { VotingHeaderService } from '../_services/votingHeader.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Captable',
  templateUrl: './Captable.component.html',
  styleUrls: ['./Captable.component.css']
})
export class CapTableComponent implements OnInit {
  public bplist: Ocrd[];
  model: any = {};
  public Compliances: ComplienceHeader[];
  public CompliancesCardCode: string;
  public loadExistingStageComponent = false;
  public loadChildComponent = false;
  public CompSubjects: CompSubject[];
  public SAPUserss: SAPUsers[];
  public ContactPersons: ContactPerson[];
  public StatusList: StatusList[];
  url: string;
  public Priority: Priority[] = [{ prcode: '0', name: 'Low' }, { prcode: '1', name: 'Medium' }, { prcode: '2', name: 'High' }];

  constructor(private http: HttpClient, private CService: ComplieanceService, private votHeaderservice: VotingHeaderService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.url = environment.apiUrl;
    this.loadBPList();

  }




  loadBPList() {
    this.votHeaderservice.getBPList().subscribe((bplist: Ocrd[]) => {

      this.bplist = bplist;
    }, error => {
      this.alertify.error(error);
    });
  }

  submitCapTableDetails() {

    const body: Captable = {
      Code: 0,
      cardCode: this.model.cardCode,
      Date: this.model.Date,
      HoldingPer: Number(this.model.HoldingPer),
      ShName: this.model.ShName,
      ShType: this.model.ShType,
      TShare: Number(this.model.TShare),


    };
    //  this.http.post(this.url + 'CapTable/AddCapTable', body);


    this.http.post(this.url + 'CapTable/AddCapTable', body).subscribe((res: any) => {
      if (res === true) {
        this.alertify.success('CapTable Added succesfull');
        this.model = {};
      } else {

      }

    });
  }

}


export interface Captable {

  Code: number;
  cardCode: string;
  Date: Date;


  ShName: string;

  ShType: string;
  TShare: number;
  HoldingPer: number;

}
