import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/Order";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../../auth/auth.service";
import {CartService} from "./cart.service";
import {Router} from "@angular/router";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.server + environment.endpoints.user;
  private getUserDetailsUrl = environment.server + environment.endpoints.userProfile

  private usersSubject = new BehaviorSubject<any>(undefined);

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private router: Router) {
  }

  getAllUsers () {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    this.httpClient.get<User[]>(this.usersUrl, { headers }).subscribe(users => {
      this.usersSubject.next(users)
    })
    return this.usersSubject
  }

  getUserDetails () {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.get<User>(this.getUserDetailsUrl, { headers })
  }

  deleteById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.delete(this.usersUrl + '/' + id, { headers })
      .subscribe(
        {
          next: () => this.getAllUsers(),
          error: () => this.router.navigate(['/404'])
        }
      )
  }

}
