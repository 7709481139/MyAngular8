import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ocrd } from '../_models/ocrd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  // tslint:disable-next-line:new-parens
  jwtHelper = new JwtHelperService;
  decodedToken: any;

  constructor(private http: HttpClient) { }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            localStorage.setItem('userinrole', user.userinrole);
            localStorage.setItem('userid', user.userid);
            localStorage.setItem('userrelated_CardCode', user.userrelated_CardCode);
            localStorage.setItem('roles', user.role);
          }
        })
      );
  }

  getBPList(): Observable<Ocrd[]> {
    return this.http.get<Ocrd[]>(this.baseUrl + 'getbplist');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
  restPassword(model: any) {
    return this.http.post(this.baseUrl + 'ResetPassword', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  CreateRole(model: any) {
    return this.http.post(this.baseUrl + 'CreateRole', model);
  }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'getroles');
  }
  getComponentList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'getComponentList');
  }
  GetAssignedRoleComponent(Role): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetAssignedRoleComponent?Role='+Role);
  }
  SetRolesAuth(model: any) {
    return this.http.post(this.baseUrl + 'SetRolesAuth', model);
  }
  getUserslist(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'getUserslist');
  }

  GetUserFromDB(UserName:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetUserFromDB?UserName='+UserName);
  }

  roleMatch(allowedRoles):Boolean
  {
    let isMatch=false;
    let userRoles=this.decodedToken.role as Array<string>;

    userRoles = userRoles.map(function(x){ return x.toUpperCase() })
    allowedRoles = allowedRoles.map(function(x){ return x.toUpperCase() })
    allowedRoles.forEach(element => {
      if(userRoles.includes(element.toUpperCase()))
      {
        isMatch=true;
        return;
        
      }
      
    });
    return isMatch;

  }
}
