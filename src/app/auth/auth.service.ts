import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../shared/models/User";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CartService} from "../shared/services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = environment.server;

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  user = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private cartService: CartService) {
    this.userSubject.next(this.getUser(this.token));
  }

  private getUser(token: string): User {
    return <User>this.jwtHelper.decodeToken(token);
  }

  get token(): any {
    return localStorage.getItem("access_token")
  }

  checkLoginStatus(): Observable<boolean> {
    const token = localStorage.getItem("access_token")
    return token !== null ? of(!this.jwtHelper.isTokenExpired(token)) : of(false);
  }

  login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };

    const body = new URLSearchParams();
    body.set("username", username);
    body.set("password", password);

    return this.httpClient
      .post<any>(this.url + environment.endpoints.login, body, options)
      .pipe(
        map(response => {
          localStorage.setItem("access_token", <string>Object.values(response)[0]);
          localStorage.setItem("refresh_token", <string>Object.values(response)[1]);
          localStorage.setItem("username", username);
        })
      );
  }

  logout() {
    localStorage.clear()
    this.cartService.cartItems = [];
    this.userSubject.next(null);
  }

  register(username: string, password: string, email: string, name: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };

    const body = {
      name: name,
      username: username,
      password: password,
      email: email
    };

    return this.httpClient
      .post<User>(this.url + environment.endpoints.user + environment.endpoints.register, JSON.stringify(body), options)
  }
}
