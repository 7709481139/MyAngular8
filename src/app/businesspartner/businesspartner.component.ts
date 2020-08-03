import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country, Currency } from '../_models/ocrd';
import { BusinesspartnerService } from '../_services/businesspartner.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BPlistdialog } from '../businesspartner/BPlistdialog';
import { Bpupdatemodel } from '../_models/bpupdatemodel';

@Component({
  selector: 'app-businesspartner',
  templateUrl: './businesspartner.component.html',
  styleUrls: ['./businesspartner.component.css']
})
export class BusinesspartnerComponent implements OnInit {
  public countrylist: Country[];
  public statelist: Country[];
  public currlist: Currency[];
  model: any = {};
  public updatemodel: Bpupdatemodel; 

  BPCardCodeDialogRef: MatDialogRef<BPlistdialog>;

  constructor(private BPService: BusinesspartnerService, private alertify: AlertifyService, public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.model.country = 'IN';
    this.loadCountryList();
    this.getStateList('IN');
    this.loadCurrencyList();
    this.model.Type="Opportunity";
  }

  loadCountryList() {
    this.BPService.getCountryList().subscribe((countrylist: Country[]) => {
      this.countrylist = countrylist;
    }, error => {
      this.alertify.error(error);
    });
  }

  AssignDialogData(result) {


  }

  loadCurrencyList() {
    this.BPService.getCurrList().subscribe((currlist: Currency[]) => {
      this.currlist = currlist;
    }, error => {
      this.alertify.error(error);
    });
  }

  getStateList(CT) {
    this.BPService.getStateList(CT).subscribe((statelist: Country[]) => {
      this.statelist = statelist;
    }, error => {
      this.alertify.error(error);
    });
  }

  refreshStateList() {
    this.getStateList(this.model.country);
  }

  submitBusinessPartner() {
    this.BPService.postbpMaster(this.model).subscribe(() => {
      if (this.model.cardcode !== undefined && this.model.cardcode !== null) {
        this.alertify.success('Company updated succesfull');
      } else {
        this.alertify.success('Company registered succesfull');
      }

      this.reloadComponent();
    }, error => {
      this.alertify.error(error);
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/ClientRegistration']);
  }

  openBPListDialog() {
    this.BPCardCodeDialogRef = this.dialog.open(BPlistdialog);
    this.BPCardCodeDialogRef.afterClosed().subscribe(result => {
      this.BPService.getSelectedBP(result).subscribe((bpmodel: Bpupdatemodel) => {
        this.updatemodel = bpmodel;
        //console.log(bpmodel);
        if (this.updatemodel !== undefined && this.updatemodel !== null) {
          this.model.cardcode = this.updatemodel.cardcode;
          this.model.cardname = this.updatemodel.cardname;
          this.model.email = this.updatemodel.email;
          this.model.website = this.updatemodel.website;
          this.model.telephone = this.updatemodel.telephone;
          this.model.sector = this.updatemodel.sector;
          this.model.currency = this.updatemodel.currency;
          this.model.pan = this.updatemodel.pan;
          this.model.notes = this.updatemodel.free_text;
          this.model.type = this.updatemodel.type;
          

          if (this.updatemodel.addressDef !== undefined && this.updatemodel.addressDef !== null) {
            this.model.adressname = this.updatemodel.addressDef.address;
            this.model.temp_address = this.updatemodel.addressDef.address;
            this.model.lineNum = this.updatemodel.addressDef.lineNum;

            this.model.street = this.updatemodel.addressDef.street;
            this.model.landmark = this.updatemodel.addressDef.address2;
            this.model.country = this.updatemodel.addressDef.country;
            this.model.state = this.updatemodel.addressDef.state;
            this.model.city = this.updatemodel.addressDef.city;
            this.model.zipcode = this.updatemodel.addressDef.zipCode;
            this.model.gstin = this.updatemodel.addressDef.gstRegnNo;
          }
          if (this.updatemodel.cnDef !== undefined && this.updatemodel.cnDef !== null) {
            this.model.pcntctCode = this.updatemodel.cnDef.cntctCode;
            this.model.pkeyname = this.updatemodel.cnDef.name;
            this.model.pcardCode = this.updatemodel.cnDef.cardCode;
            this.model.pfname = this.updatemodel.cnDef.firstName;
            this.model.plname = this.updatemodel.cnDef.lastName;
            this.model.pmobile = this.updatemodel.cnDef.cellolar;
            this.model.pemail = this.updatemodel.cnDef.e_MailL;
            this.model.ptel = this.updatemodel.cnDef.tel1;
            this.model.pposition = this.updatemodel.cnDef.position;
          }
          if (this.updatemodel.cnSec !== undefined && this.updatemodel.cnSec !== null) {
            this.model.scntctCode = this.updatemodel.cnSec.cntctCode;
            this.model.skeyname = this.updatemodel.cnSec.name;
            this.model.scardCode = this.updatemodel.cnSec.cardCode;
            this.model.sfname = this.updatemodel.cnSec.firstName;
            this.model.slname = this.updatemodel.cnSec.lastName;
            this.model.smobile = this.updatemodel.cnSec.cellolar;
            this.model.semail = this.updatemodel.cnSec.e_MailL;
            this.model.stel = this.updatemodel.cnSec.tel1;
            this.model.sposition = this.updatemodel.cnSec.position;
          }

        }
      }, error => {
        this.alertify.error(error);
      });
    });
  }

}




