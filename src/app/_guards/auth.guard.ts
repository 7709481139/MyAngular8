import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {

  }
  canActivate(next:ActivatedRouteSnapshot ,state: RouterStateSnapshot): boolean {
    //const roles=next.data['roles']as Array<string>;
    let userRoles=this.authService.decodedToken.role.toString() ;//as Array<string>;
    let user_name=this.authService.decodedToken.unique_name;
    if(user_name.toUpperCase()=="ADMIN"){return true;}
    if(userRoles)
   {
     
    let CurrComponent = next.routeConfig.path;
    //console.log(state.root.component);
     // let CurrComponent=next.component['name'];
    this.authService.GetAssignedRoleComponent(userRoles).subscribe((allowedComponents: any[]) => {       
      
             
             
        if(allowedComponents.includes(CurrComponent))
        {
          return true;
        }else{
          this.router.navigate(['/Login']);
          this.alertify.error('You are not authorised to access this component');
          
          return false;
        }      
      

    }, error => {
      this.alertify.error("test");
      return false;
    });
  }

    
    /*if(roles)
    {
      const match=this.authService.roleMatch(roles);
      if(match)
      {
        return true;
      }else{
        this.router.navigate(['members']);
        this.alertify.error('You are not authorised to access this area');
      }
    }*/

    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('you shall not pass!');
    this.router.navigate(['/Home']);
    return false;
  }

}
