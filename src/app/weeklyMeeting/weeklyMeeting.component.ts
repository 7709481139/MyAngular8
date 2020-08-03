import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComplieanceService } from '../_services/complieance.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpRequest, HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap, last, catchError } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { Ocrd } from '../_models/ocrd';
import { VotingHeaderService } from '../_services/votingHeader.service';
import { SAPUsers, ContactPerson, StatusList, Priority } from '../_models/complienceHeader';
import { formatDate } from '@angular/common';
import { MeetingService } from '../_services/meeting.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Listdialog } from '../weeklyMeeting/List-dialog';
import { SingleMeeting } from '../_models/Meeting';
import { saveAs } from 'file-saver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-weeklyMeeting',
  templateUrl: './weeklyMeeting.component.html',
  styleUrls: ['./weeklyMeeting.component.css']
})
export class WeeklyMeetingComponent implements OnInit {


  public bplist: Ocrd[];
  model: any = {};
  model2: any = {};
  sendtoFiles: any = [];
  UpdateModel: SingleMeeting;
  public SAPUserss: SAPUsers[];
  public ContactPersons: ContactPerson[];
  public StatusList: StatusList[];
  public Priority: Priority[] = [{ prcode: '0', name: 'Low' }, { prcode: '1', name: 'Medium' }, { prcode: '2', name: 'High' }];

  // //File

  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = environment.apiUrl + 'Complieance/UploadFiles';

  // tslint:disable-next-line:no-output-native
  @Output() complete = new EventEmitter<string>();

  public files: Array<FileUploadModel> = [];

  // //File End


  DocKeyDialogRef: MatDialogRef<Listdialog>;
  constructor(private ComplService: ComplieanceService, private alertify: AlertifyService, private http: HttpClient,
              public dialog: MatDialog, private router: Router, private votHeaderservice: VotingHeaderService,
              private meetingService: MeetingService) { }

  ngOnInit() {
    this.loadBPList();
    this.GetSAPUsersList();
    this.loadBPList();
    this.GetStatusList();
    this.model.prcode = '1';
    this.model.status = -2;
    this.model.time = '11:00';
  }

  openListDialog() {
    this.DocKeyDialogRef = this.dialog.open(Listdialog);
    this.DocKeyDialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result != null) {
        this.meetingService.GetSelectedMeetingData(result).subscribe((md: SingleMeeting) => {
          this.UpdateModel = md;
          this.model.clgcode = this.UpdateModel.clgcode;
          this.model.cardCode = this.UpdateModel.cardcode;
          this.GetContactPersonList();
          this.model.assignesto = this.UpdateModel.assignesto;
          this.model.cntctcode = this.UpdateModel.cntctcode;
          this.model.startdate = this.UpdateModel.startdate;
          this.model.enddate = this.UpdateModel.enddate;
          this.model.prcode = this.UpdateModel.prio;
          this.model.time = this.UpdateModel.time;
          this.model.details = this.UpdateModel.details;
          this.model.notes = this.UpdateModel.notes;
          this.model.clgcode = this.UpdateModel.clgcode;
          this.model.source = this.UpdateModel.source;
          this.model.atc = this.UpdateModel.atc;
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  loadBPList() {
    this.votHeaderservice.getBPList().subscribe((bplist: Ocrd[]) => {
      this.bplist = bplist;
    }, error => {
      this.alertify.error(error);
    });
  }
  GetSAPUsersList() {
    this.ComplService.GetSAPUsersList().subscribe((SAPUserss: SAPUsers[]) => {
      this.SAPUserss = SAPUserss;
    }, error => {
    });
  }

  GetStatusList() {
    this.ComplService.GetComplienceStatusList().subscribe((Statuslist: StatusList[]) => {
      this.StatusList = Statuslist;
    }, error => {
    });
  }
  GetContactPersonList() {
    this.ComplService.GetContactPersonList(this.model.cardCode).subscribe((ContactPersons: ContactPerson[]) => {
      this.ContactPersons = ContactPersons;
    }, error => {
      this.alertify.error(error);
    });
  }


  submitWeeklyMeeting() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-IN';
    this.model.str_startdate = formatDate(this.model.startdate, format, locale);
    this.model.str_enddate = formatDate(this.model.enddate, format, locale);
    this.model.userid = localStorage.getItem('userid');
    this.model.files = this.sendtoFiles;
    this.meetingService.submitWeeklyMeeting(this.model).subscribe(() => {
      this.alertify.success('Meeting created Succesfull');
      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Weeklymeeting']);
  }


  // file related


  downloadFile5(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }

  DownLoadAtc(absEntry, line, filename) {
    this.model2.absEntry = absEntry;
    this.model2.line = line;
    this.model2.filename = filename;

    this.ComplService.DownloadFile(this.model2)
      .subscribe((data) => this.downloadFile5(data, this.model2.filename),
        error => this.alertify.error('Error downloading the file.')
      );
  }


  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this.http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of('${file.data.name} upload failed.');
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    // fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
      this.sendtoFiles.push(file.data.name);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}



export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;

}

