import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Ocrd } from '../_models/ocrd';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegister = new EventEmitter();
  model: any = {};
  public roleslist: any[];
  public userslist: any[];
  public user: any;
  public bplist: Ocrd[];
  myControl = new FormControl();
  UserNameValue: string = 'New';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  
  isValidFormSubmitted = false;  
  constructor(private authsService: AuthService, private alerify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.getUserRoles();
    this.loadBPList();
    this.getUsersList();
  }

  register() {
    if(this.UserNameValue=="New")
    {
      if (this.model.password !== this.model.cpassword) {
      this.alerify.error('Password did not match!!');
      return;
      }
      if(this.model.role==null)
    {this.alerify.error('Please select role!');
    return;}
     
  }
   else{ this.model.password="";
    this.model.cpassword="";}
    this.authsService.register(this.model).subscribe(() => {
    this.alerify.success('Operation completed successfully!!');
    this.reloadComponent();
  }, error => {
    this.alerify.error(error);
  });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Register']);
  }

  cancel() {
    this.CancelRegister.emit(false);
    console.log('cancelled');
  }
  getUserRoles() {
    this.authsService.getRoles().subscribe((roles: any[]) => {
      this.roleslist = roles;
    }, error => {
      this.alerify.error(error);
    });
  }

  loadBPList() {
    this.authsService.getBPList().subscribe((bplist: Ocrd[]) => {
      this.bplist = bplist;
    }, error => {
      this.alerify.error(error);
    });
  }

  getUsersList() {
    this.authsService.getUserslist().subscribe((Users: any[]) => {
      this.userslist = Users;
    }, error => {
      this.alerify.error(error);
    });
  }

  /*GetUserDetails(userId) {
    this.user = this.GetUserFromDB(userId);
    if (this.user !== undefined) {
      this.model.role = this.user.role;
      this.model.cardCode = this.user.cardCode;
      this.model.mobile = this.user.mobile;
      this.model.email = this.user.email;
      this.model.password = this.user.temppass;
      this.model.cpassword = this.user.temppass;

    }
  }*/
  
  GetUserDetails(userId) {

    this.UserNameValue=userId;
    if(userId=="New" || userId=="" ){
      this.model.role = "";
      this.model.cardCode = "";
      this.model.username="";
      this.model.mobile ="";
      this.model.email = "";
      this.model.password = "";
      this.model.cpassword = "";
      this.UserNameValue="New";
    }else{
      
    this.authsService.GetUserFromDB(userId).subscribe((Users: any) => {
      this.user = Users;
      if (this.user !== undefined) {
        this.model.role = this.user.role;
        this.model.cardCode = this.user.cardCode;
        this.model.mobile = this.user.mobile;
        this.model.email = this.user.email;
        this.model.password = this.user.temppass;
        this.model.cpassword = this.user.temppass;
  
      }
      if(this.user.userName==null)
      {this.UserNameValue="New";}
      else{this.UserNameValue="";}
    }, error => {
      this.alerify.error(error);
    });}
  }
  getDimensionsByFind(id) {
    return this.userslist.find(x => x.userName === id);
  }

}
