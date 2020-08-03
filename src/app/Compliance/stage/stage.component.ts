import { saveAs } from 'file-saver';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ComplieanceService } from 'src/app/_services/complieance.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ComplienceHeader, CompSubject,CompType, SAPUsers, Priority, StatusList, ContactPerson } from 'src/app/_models/complienceHeader';
import { Subscription, of } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, tap, last, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class StageComponent implements OnInit {

  model: any = {};
  model2: any = {};
  sendtoFiles: any = [];
  step = 0;
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


  constructor(private ComplService: ComplieanceService, private alertify: AlertifyService, private http: HttpClient,
              private router: Router) { }

  @Input() ComplienceHeader: ComplienceHeader;
  @Input() CompSubjects: CompSubject[];
  @Input() CompTypes: CompType[];
  @Input() SAPUserss: SAPUsers[];
  @Input() ContactPersons: ContactPerson[];
  @Input() StatusList: StatusList[];
  @Input() Priority: Priority[];
  @Input() loadChildComponent: boolean;
  @Input() loadExistingStageComponent: boolean;
  @Input() CompliancesCardCode: string;


  ngOnInit() {
    if (this.ComplienceHeader !== undefined) {
      this.model.subject = this.ComplienceHeader.subject;
      this.model.cardcode = this.ComplienceHeader.cardcode;
      this.model.clgcode = this.ComplienceHeader.clgcode;
      this.model.type = this.ComplienceHeader.type;
      this.model.assignesto = this.ComplienceHeader.assignesto;
      this.model.cntctcode = this.ComplienceHeader.cntctcode;
      this.model.details = this.ComplienceHeader.details;
      this.model.startdate = this.ComplienceHeader.startdate;
      this.model.enddate = this.ComplienceHeader.enddate;
      this.model.prcode = this.ComplienceHeader.priority;
      this.model.status = this.ComplienceHeader.status;
      this.model.notes = this.ComplienceHeader.notes;
      this.model.atc = this.ComplienceHeader.atc;
      const format = 'dd/MM/yyyy';
      const locale = 'en-IN';
      this.model.str_startdate = formatDate(this.model.startdate, format, locale);
      this.model.str_enddate = formatDate(this.model.enddate, format, locale);


    } else {
      this.model.prcode = '2';
      this.model.status = 1;
    }
  }
  
  DefineVoting(){
    
    this.ComplService.StageID=this.model.clgcode; 
    this.ComplService.SubjectID=this.model.subject; 
    this.ComplService.CompliancesCardCode=this.model.cardcode; 
    
    
    this.router.navigate(['/DefineVoting']);
  }

  getComplienceByFind(id) {
    return this.CompSubjects.find(x => x.code === id).name;
  }
  getAssigneToFind(id) {
    return this.SAPUserss.find(x => x.code === id).name;
  }
  getStatusFind(id) {
    return this.StatusList.find(x => x.code === id).name;
  }


  fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files);
  }

  submitStage() {
    event.stopPropagation();
    this.model.cardcode = this.CompliancesCardCode;
    const format = 'dd/MM/yyyy';
    const locale = 'en-IN';
    this.model.str_startdate = formatDate(this.model.startdate, format, locale);
    this.model.str_enddate = formatDate(this.model.enddate, format, locale);
    this.model.files = this.sendtoFiles;

    this.ComplService.postSingleStageActivity(this.model).subscribe(() => {
      this.alertify.success('Create new stage Succesfull');
      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });

  }

  updateStage() {
    this.model.cardcode = this.ComplienceHeader.cardcode;
    this.model.clgcode = this.ComplienceHeader.clgcode;
    const format = 'dd/MM/yyyy';
    const locale = 'en-IN';
    this.model.str_startdate = formatDate(this.model.startdate, format, locale);
    this.model.str_enddate = formatDate(this.model.enddate, format, locale);
    this.model.files = this.sendtoFiles;
    if (this.model.cntctcode === (null || undefined)) {
      this.model.cntctcode = -1;
    }
    this.ComplService.postSingleStageActivity(this.model).subscribe(() => {
      this.alertify.success('update stage Succesfull');
      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });

  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Portfolio']);
  }

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

  // file related

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
    console.log(this.sendtoFiles);
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  // end file related

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
