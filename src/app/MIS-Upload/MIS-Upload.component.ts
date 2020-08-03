import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MISService } from '../_services/MIS.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { MISData } from '../_models/MIS-Data';
type AOA = any[][];


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-MIS-Upload',
  templateUrl: './MIS-Upload.component.html',
  styleUrls: ['./MIS-Upload.component.css']
})
export class MISUploadComponent implements OnInit {
  data: AOA = [[ , ], [ , ]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  jsonData = null;
  model: any = {};
  ReportData: MISData[];
  public TypeList: any[] = [{ Code: 'Monthly', name: 'Monthly' }, { Code: 'Quarterly', name: 'Quarterly' },
  { Code: 'Yearly', name: 'Yearly' }];

  constructor(private MISServ: MISService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.model.Type = 'Monthly';
  }


  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      this.alertify.error('Cannot use multiple files');
    } else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA;
      };
      reader.readAsBinaryString(target.files[0]);

      let workBook = null;

      const reader2 = new FileReader();
      const file = evt.target.files[0];
      reader2.onload = (event) => {
        const data = reader2.result;
        workBook = XLSX.read(data, { type: 'binary' });
        this.jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        // this.model = JSON.stringify(this.jsonData.Sheet1);
        this.model.Lines = this.jsonData.Sheet1;
      };

      reader2.readAsBinaryString(file);
    }

  }


  SubmitData(): void {

    this.MISServ.submitMISData(this.model).subscribe(() => {
      this.alertify.success('Data submited Succesfull');
      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/MISupload']);
  }

  GetMISReport() {
    this.MISServ.GetMISReport(this.model.RPTType).subscribe((ReportData: MISData[]) => {
      this.ReportData = ReportData;
    }, error => {
      this.alertify.error(error);
    });
  }

}
