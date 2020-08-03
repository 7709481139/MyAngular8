import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthModel } from '../_models/AuthModel';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  authModel: AuthModel = {
    Rt_clientreg: true,
    Rt_portfolio: true,
    Rt_definevoting: true,
    Rt_voting: true,
    Rt_votingreport: true,
    Rt_register: true,
    Rt_resetpassword: true
  };
  userinrole = localStorage.getItem('userinrole');

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router,private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.SetVisibilityToNav(this.userinrole);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/Home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userinrole');
    localStorage.removeItem('userid');
    this.alertify.message('logged out');
    this.router.navigate(['/Login']);
  }

  SetVisibilityToNav(userRole) {

    let userRoles=this.authService.decodedToken.role as Array<string>;
    
    this.authModel.Rt_clientreg = true;
        this.authModel.Rt_portfolio = true;
        this.authModel.Rt_definevoting = true;
        this.authModel.Rt_voting = true;
        this.authModel.Rt_votingreport = true;
        this.authModel.Rt_register = true;
        this.authModel.Rt_resetpassword = true;

    if (userRole !== undefined && userRole !== '') {
      if (userRole === 'admin') {
        this.authModel.Rt_clientreg = true;
        this.authModel.Rt_portfolio = true;
        this.authModel.Rt_definevoting = true;
        this.authModel.Rt_voting = true;
        this.authModel.Rt_votingreport = true;
        this.authModel.Rt_register = true;
        this.authModel.Rt_resetpassword = true;

      } else if (userRole === 'clientceo') {
        this.authModel.Rt_clientreg = false;
        this.authModel.Rt_portfolio = true;
        this.authModel.Rt_definevoting = false;
        this.authModel.Rt_voting = false;
        this.authModel.Rt_votingreport = false;
        this.authModel.Rt_register = false;
        this.authModel.Rt_resetpassword = false;
      }
    }

  }

}
