import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material';
import { MeetingService } from '../_services/meeting.service';
import { Meeting } from '../_models/Meeting';

@Component({
    selector: 'app-list-dialog',
    templateUrl: 'list-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class Listdialog implements OnInit {


    public Meetlist: Meeting[];
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['actions', 'clgcode', 'cardcode', 'cardname', 'startdate', 'enddate', 'time', 'prio', 'status', 'details'];
    public ClientId: string;
    public dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;


    constructor(private meetingService: MeetingService, private alertify: AlertifyService, private dialogRef: MatDialogRef<Listdialog>) {
    }

    ngOnInit() {
        this.loadMeetingList();
        this.dataSource = new MatTableDataSource();
    }
    loadMeetingList() {
        this.meetingService.getMeetingList(4).subscribe((cliList: Meeting[]) => {
            this.Meetlist = cliList;
            this.dataSource.data = cliList;
            this.dataSource.paginator = this.paginator;
        }, error => {
            this.alertify.error(error);
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    selectRow(CardCode) {
        this.dialogRef.close(CardCode);
    }
    afterClosed(): void {
        // set the closeMessage property here
        this.ClientId = this.ClientId;
    }


}
