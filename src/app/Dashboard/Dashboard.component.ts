import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MeetingService } from '../_services/meeting.service';
import { Meeting } from '../_models/Meeting';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public Meetlist: Meeting[];
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['cardname', 'startdate', 'enddate', 'time', 'source',  'prio', 'status', 'details', 'addedby', 'createdate', 'updatedby', 'updatdate'];
  public ClientId: string;
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(private meetingService: MeetingService) { }

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

    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
