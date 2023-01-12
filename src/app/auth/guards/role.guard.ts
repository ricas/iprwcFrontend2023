import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import decode from 'jwt-decode';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationService} from "../auth.service";
import {Role} from "../../shared/models/Role";
import {Jwt} from "../../shared/models/Jwt";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router,
              private jwtHelper: JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = <Role>route.data["role"]
    const token = this.authService.token;
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.authService.logout();
      return false;
    }
    if (!role)
      role = Role.ROLE_USER

    const payload = <Jwt>decode(token)

    if (role===Role.ROLE_ADMIN && !payload.roles.includes(Role.ROLE_ADMIN) || !this.authService.checkLoginStatus()) {
      this.router.navigate(['404'])
      return false;
    }

    if (!this.authService.checkLoginStatus() || !payload.roles.includes(role)) {
      this.authService.logout()
      this.router.navigate(['login'])
      return false
    }

    return true
  }
}
