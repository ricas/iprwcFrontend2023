import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderProduct} from "../models/OrderProduct";
import {Product} from "../models/Product";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: OrderProduct[] = [];

  constructor() {
    this.cartItems = this.getCart()
  }

  checkIfCartEmpty(): Observable<boolean> {
    const cart = localStorage.getItem("order")
    return cart === null ? of(true) : of(false);
  }

  updateOrder(data: any[]) {
    localStorage.setItem('order', JSON.stringify(data));
  }

  addToCart(product: Product, qty: number) {
    let orderProduct = new OrderProduct(product, qty)
    let existingOrderProduct = this.productExists(product)
    if (!existingOrderProduct) {
      this.cartItems.push(orderProduct);
    } else {
      let index = this.cartItems.indexOf(existingOrderProduct)
      this.cartItems[index].quantity += qty;
    }

    localStorage.setItem("order", JSON.stringify(this.cartItems))
  }
  removeFromCart(orderProduct: OrderProduct) {
    const cart = this.getCart()
    const removeProduct = () => {
      return cart.filter(object =>
        object.product.id !== orderProduct.product.id)
    }
    this.updateOrder(removeProduct())
    this.cartItems=this.getCart()
  }

  productExists(product: Product): OrderProduct | null {
    let result = null;
    this.cartItems.forEach((orderProduct) => {
      if (orderProduct.product.id === product.id) {
        result = orderProduct
      }
    });
    return result;
  }

  getCart() {
    const tempOrders: OrderProduct[] = [];
    const cartString = localStorage.getItem("order");
    if (cartString && cartString.length) {
      const cartStringParsed = JSON.parse(cartString)
      cartStringParsed.forEach((object: any) => {
        tempOrders.push(OrderProduct.orderProductFromObject(object))
      });
    }
    return tempOrders;
  }

  clearCart(){
    localStorage.removeItem("order");
    this.cartItems = [];
  }

}
