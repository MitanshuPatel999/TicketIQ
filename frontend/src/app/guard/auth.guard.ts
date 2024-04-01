import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(private router: Router,private service:AuthService){

  }role:string=""
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.service.isLoggedIn()) {
        if (route.url.length > 0) {
          let menu = route.url[0].path;
          if (menu == 'user') {
            this.service.getRole().subscribe(role=>this.role=role)
            if ( this.role == 'admin') {
              return true;
            } else {
              this.router.navigate(['']);
                alert('You dont have access.')
              return false;
            }
          }else{
            return true;
          }
        } else {
          return true;
        }
      }
      else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }

