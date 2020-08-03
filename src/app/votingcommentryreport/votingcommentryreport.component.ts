import { Component, OnInit } from '@angular/core';
import { BusinesspartnerService } from '../_services/businesspartner.service';
import { AlertifyService } from '../_services/alertify.service';
import { VotingElement } from '../_models/ocrd';
import { formatDate } from '@angular/common';
import { IgxExcelExporterService, IgxExcelExporterOptions } from "igniteui-angular";
@Component({
  selector: 'app-votingcommentryreport',
  templateUrl: './votingcommentryreport.component.html',
  styleUrls: ['./votingcommentryreport.component.css']
})
export class VotingcommentryreportComponent implements OnInit {

  votingDataList: VotingElement[];
  showMyContainer = false;
  email = '';
  aa = false;
  model: any = {};

voting:any=[];

  constructor(private BPService: BusinesspartnerService, private alertify: AlertifyService,private excelExportService: IgxExcelExporterService) { }


  ngOnInit() {
    this.LoadVotingResultData();    
  }
  public exportButtonHandler() {
    //this.excelExportService.exportData(this.votingDataList, new IgxExcelExporterOptions("ExportedDataFile"));
    
  }
  
  LoadVotingResultData() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-IN';
    this.model.str_fromdate ='';
    this.model.str_todate ='';
    if(this.model.fromdate !=undefined && this.model.todate!=undefined)
    {
      this.model.str_fromdate = formatDate(this.model.fromdate, format, locale);
     this.model.str_todate = formatDate(this.model.todate, format, locale);  
    }    
    if(this.model.status==undefined)
    {this.model.status='';}
    

    this.BPService.getVotingReportData(this.model.str_fromdate,this.model.str_todate,this.model.status).subscribe((votingDataList: VotingElement[]) => {
      this.votingDataList = votingDataList;
    }, error => {
      this.alertify.error(error);
    });
  }
  setIndex(ii) {
    this.aa = ii;

  }
}
