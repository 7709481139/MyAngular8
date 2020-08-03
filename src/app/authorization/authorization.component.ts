import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  @Output() CancelRegister = new EventEmitter();
  model: any = {};
  public roleslist: any[];
  public ComponentList: any[];  
  myControl = new FormControl();
  UserNameValue: string = 'New';  
  constructor(private authsService: AuthService, private alerify: AlertifyService, private router: Router) { }
  ngOnInit() {
    this.getRoles();    
    this.getComponentList();
  }

  SetRolesAuth() {    
    if(this.model.role==null)
    {  this.alerify.error('Please select role!');
    return;}     
    
    this.authsService.SetRolesAuth(this.model).subscribe(() => {
    this.alerify.success('Operation completed successfully!!');
    this.reloadComponent();
  }, error => {
    this.alerify.error(error);
  });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Authorization']);
  }

  cancel() {
    this.CancelRegister.emit(false);
    console.log('cancelled');
  } 

  getRoles() {
    this.authsService.getRoles().subscribe((Roles: any[]) => {
      this.roleslist = Roles;
    }, error => {
      this.alerify.error(error);
    });
  }
  getComponentList() {
    /*this.authsService.getComponentList().subscribe((Components: any[]) => {
      this.ComponentList = Components;
    }, error => {
      this.alerify.error(error);
    });*/
    this.ComponentList =['Login',
      'Home','Dashboard', 'ClientRegistration', 'Portfolio',
       'DefineVoting','Voting','Votingreport','Votingcommentryreport',
      'Register','Resetpassword','Createrole','Boardmeeting',
       'Weeklymeeting','MISupload','CapTable', 'Authorization'   ]  
  }
  GetAssignedRoleComponent(role)
  {
    //const RoleArray = <string[]>role;
    
    this.authsService.GetAssignedRoleComponent(role).subscribe((Components: any[]) => {
      this.model.component = Components;

    }, error => {
      this.alerify.error(error);
    });
  }
}
