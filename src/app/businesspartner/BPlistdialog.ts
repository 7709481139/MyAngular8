import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientSAP } from '../_models/ocrd';
import { BusinesspartnerService } from '../_services/businesspartner.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bp-list-dialog',
  templateUrl: 'bp-list-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class BPlistdialog implements OnInit {
  public clientlist: ClientSAP[];
  displayedColumns: string[] = ['actions', 'cardcode', 'cardname', 'email', 'telephone', 'sector', 'currency','Type'];
  public ClientId: string;

  // modules = AllCommunityModules;
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(private BPService: BusinesspartnerService, private alertify: AlertifyService, private dialogRef: MatDialogRef<BPlistdialog>) {
  }
  ngOnInit() {
    this.loadClientList();
    this.dataSource = new MatTableDataSource();
  }
  loadClientList() {
    this.BPService.getClientList().subscribe((cliList: ClientSAP[]) => {
      this.clientlist = cliList;
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
