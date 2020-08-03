import { Component, OnInit } from '@angular/core';
import { VotingHeaderService } from '../../_services/votingHeader.service';
import { Ocrd } from '../../_models/ocrd';
import { AlertifyService } from '../../_services/alertify.service';
import { ComplieanceService } from 'src/app/_services/complieance.service';
import { ComplienceHeader, CompSubject,CompType, SAPUsers, StatusList, Priority, ContactPerson } from 'src/app/_models/complienceHeader';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-PortfolioCompliance',
  templateUrl: './PortfolioCompliance.component.html',
  styleUrls: ['./PortfolioCompliance.component.css']
})
export class PortfolioComplianceComponent implements OnInit {
  public MyName='PortfolioComplianceComponent';
  public bplist: Ocrd[];
  model: any = {};
  public Compliances: ComplienceHeader[];
  public CompliancesCardCode: string;
  public loadExistingStageComponent = false;
  public loadChildComponent = false;
  public CompSubjects: CompSubject[];
  public CompTypes: CompType[];
  public SAPUserss: SAPUsers[];
  public ContactPersons: ContactPerson[];
  public StatusList: StatusList[];
  public Priority: Priority[] = [{ prcode: '0', name: 'Low' }, { prcode: '1', name: 'Medium' }, { prcode: '2', name: 'High' }];

  constructor(private CService: ComplieanceService, private votHeaderservice: VotingHeaderService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadBPList();
    this.GetSubjectList();
    this.GetTypeList();
    this.GetSAPUsersList();
    this.GetComplienceStatusList();

  }


  loadFromClientSelectionComponent() {
    this.loadExistingStageComponent = true;
  }

  loadMyChildComponent() {
    if (this.model.cardCode === undefined) {
      this.alertify.error('Select client first');
    } else {
      this.loadChildComponent = true;
      this.CompliancesCardCode = this.model.cardCode;
    }


  }

  loadBPList() {
    this.votHeaderservice.getBPList().subscribe((bplist: Ocrd[]) => {
      this.bplist = bplist;
    }, error => {
      this.alertify.error(error);
    });
  }

  GetSubjectList() {
    this.CService.GetSubjectList().subscribe((CompSubjects: CompSubject[]) => {
      this.CompSubjects = CompSubjects;
    }, error => {
    });
  }

  GetTypeList() {
    this.CService.GetTypeList().subscribe((CompTypes: CompType[]) => {
      this.CompTypes = CompTypes;
    }, error => {
    });
  }

  GetSAPUsersList() {
    this.CService.GetSAPUsersList().subscribe((SAPUserss: SAPUsers[]) => {
      this.SAPUserss = SAPUserss;
    }, error => {
    });
  }

  GetContactPersonList() {
    this.CService.GetContactPersonList(this.model.cardCode).subscribe((ContactPersons: ContactPerson[]) => {
      this.ContactPersons = ContactPersons;
    }, error => {
      this.alertify.error(error);
    });
  }

  GetComplienceStatusList() {
    this.CService.GetComplienceStatusList().subscribe((Statuslist: StatusList[]) => {
      this.StatusList = Statuslist;
    }, error => {
    });
  }

  GetComplianceList() {
    this.CService.GetComplianceList(this.model.cardCode).subscribe((Compliances: ComplienceHeader[]) => {
      this.Compliances = Compliances;
      this.loadFromClientSelectionComponent();
      this.GetContactPersonList();
    }, error => {
      this.alertify.error(error);
    });
  }

}
