import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  model: any = {};
  public userslist: any[];
  public user: any;
  myControl = new FormControl();

  constructor(private authsService: AuthService, private alerify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Resetpassword']);
  }

  resetPassword() {
    if(this.model.username==null)
    {this.alerify.error('Please select user!');
    return;}
    if (this.model.ConfirmPwd !== this.model.NewPassWord) {
      this.alerify.error('Password did not match!');
      return;
    }
    this.authsService.restPassword(this.model).subscribe(() => {
      this.alerify.success('pasword changed Succesfull');
      this.reloadComponent();
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


  GetUserDetails(userId) {
    this.user = this.getDimensionsByFind(userId);
    if (this.user !== undefined) {
      this.model.currpassword = this.user.temppass;

    }
  }

  getDimensionsByFind(id) {
    return this.userslist.find(x => x.userName === id);
  }

}
