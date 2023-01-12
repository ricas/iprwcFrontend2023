import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Product} from "../models/Product";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = environment.server + environment.endpoints.products;
  private productsSubject = new BehaviorSubject<any>(undefined);
  private productSubject = new BehaviorSubject<any>(undefined);

  constructor(private httpClient: HttpClient,
              private router: Router,
              private authService: AuthenticationService) {}

  getProducts () {
    this.httpClient.get<Product[]>(this.url).subscribe(products => {
      this.productsSubject.next(products)
    })
    return this.productsSubject
  }

  getProductById (id: number){
    this.httpClient.get(this.url + '/' + id)
      .subscribe(
        {
          next: product => this.productSubject.next(product),
          error: () => this.router.navigate(['/404'])
        });
    return this.productSubject
  }

  addProduct(product: Object){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.post(this.url, product,{ headers })
      .subscribe(
        {
          next: products => this.productsSubject.next(products),
          error: () => this.router.navigate(['/404'])
        }
      )
  }

  deleteById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token}`);
    return this.httpClient.delete(this.url + '/' + id, { headers })
      .subscribe(
        {
          next: () => this.getProducts(),
          error: () => this.router.navigate(['/404'])
        }
      )
  }
}
