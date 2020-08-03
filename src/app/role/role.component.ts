import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  model: any = {};
  public usersist: any[];
  public user: any;
  myControl = new FormControl();

  constructor(private authsService: AuthService, private alerify: AlertifyService, private router: Router) { }

  ngOnInit() {
    //this.getUsersList();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Createrole']);
  }

  CreateRole() {
    if (this.model.name =="") {
      this.alerify.error('Please enter role.');
      return;
    }
    this.authsService.CreateRole(this.model).subscribe(() => {
      this.alerify.success('Role Added Succesfully!');
      this.reloadComponent();
    }, error => {
      this.alerify.error(error);
    });
  }



}
