import { Component, OnInit,Input } from '@angular/core';
import { Ocrd } from '../_models/ocrd';
import { VotingHeaderService } from '../_services/votingHeader.service';
import { AlertifyService } from '../_services/alertify.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ComplieanceService } from 'src/app/_services/complieance.service';
import { ComplienceHeader, CompSubject,CompType, SAPUsers, Priority, StatusList, ContactPerson } from 'src/app/_models/complienceHeader';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-defineVoting',
  templateUrl: './defineVoting.component.html',
  styleUrls: ['./defineVoting.component.css']
})
export class DefineVotingComponent implements OnInit {
  public bplist: Ocrd[];
  model: any = {};
  constructor(private CService: ComplieanceService,private votHeaderservice: VotingHeaderService, private alertify: AlertifyService, private router: Router) { }
  @Input() CompSubjects: CompSubject[];
   StageID: number;
   SubjectID: number;
   CompliancesCardCode: string;

  ngOnInit() {
    this.loadBPList();
    this.model.time = '12:00';
    this.model.opentime = '08:00';
    
    this.GetSubjectList();
    this.model.subject=this.CService.SubjectID;
    this.model.cardCode=this.CService.CompliancesCardCode;
    
    this.model.prevactvty=this.CService.StageID;
  }

  loadBPList() {
    this.votHeaderservice.getBPList().subscribe((bplist: Ocrd[]) => {
      this.bplist = bplist;
      
    }, error => {
      this.alertify.error(error);
    });
  }
  SetVotingCloseDate(Startdate:any)
  {
    
    var Startdate1=new Date(Startdate);
    var n = Startdate1.getDay();
    
switch (n) {
  case 0:
     n=2;
      break;
  case 1:
    n=1;
      break;
  case 2:
    n= 0
      break;
  case 3:
     n= 6
      break;
  case 4:
      n=5;
      break;
  case 5:
      n=4;
      break;
  case 6:
      n=3;
      break;
  
}

      this.model.enddate=new Date(Startdate1.setDate(Startdate1.getDate() + n));
      this.model.startdate=new Date(Startdate);
      }

  postVotingActivity() {

    const format = 'dd/MM/yyyy';
    const locale = 'en-IN';
    this.model.str_startdate = formatDate(this.model.startdate, format, locale);
    this.model.str_enddate = formatDate(this.model.enddate, format, locale);
    this.votHeaderservice.postVotingActivity(this.model).subscribe(() => {
      this.alertify.success('Voting is defined succesfully');
      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/DefineVoting']);
  }

  GetSubjectList() {
    this.CService.GetSubjectList().subscribe((CompSubjects: CompSubject[]) => {
      this.CompSubjects = CompSubjects;
    }, error => {
    });
  }
}
