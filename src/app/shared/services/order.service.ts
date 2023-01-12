import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../models/Order";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../../auth/auth.service";
import {CartService} from "./cart.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getOrderPerUserUrl = environment.server + environment.endpoints.user + environment.endpoints.order;
  private orderUrl = environment.server + environment.endpoints.order;
  private ordersSubject = new BehaviorSubject<any>(undefined);
  private allUserOrdersSubject = new BehaviorSubject<any>(undefined);

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private cartService: CartService,
              private router: Router) {
  }

  getUserOrders () {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    this.httpClient.get<Order[]>(this.getOrderPerUserUrl, { headers }).subscribe(products => {
      this.ordersSubject.next(products)
    })
    return this.ordersSubject
  }

  getAllOrders() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    this.httpClient.get<Order[]>(this.orderUrl, { headers }).subscribe(products => {
      this.allUserOrdersSubject.next(products)
    })
    return this.allUserOrdersSubject
  }

  createOrder (order: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")};

    const requestOptions = { headers, options };
    return this.httpClient.post<Order>(this.orderUrl, order , requestOptions).subscribe(
      () => {
        this.cartService.clearCart();
        this.router.navigate(['profile'])
      }
    );
  }

}
