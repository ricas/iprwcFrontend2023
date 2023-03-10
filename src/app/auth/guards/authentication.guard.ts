import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthenticationService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkLoginStatus().pipe(
      tap((userLoggedIn) => {
        if (!userLoggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
