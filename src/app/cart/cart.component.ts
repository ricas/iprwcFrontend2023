import {Component, OnInit} from '@angular/core';
import {CartService} from "../shared/services/cart.service";
import {OrderProduct} from "../shared/models/OrderProduct";
import {AuthenticationService} from "../auth/auth.service";
import {OrderService} from "../shared/services/order.service";
import {User} from "../shared/models/User";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, AuthenticationService, OrderService, UserService]
})
export class CartComponent implements OnInit{

  loggedInUser!: User;
  orderProducts: OrderProduct[] = [];
  cartEmpty: boolean = true;

  constructor(private cartService: CartService,
              private authService: AuthenticationService,
              private orderService: OrderService,
              private userService: UserService) {
    this.orderProducts = this.cartService.getCart();
    this.cartService.checkIfCartEmpty().subscribe(value => {
      this.cartEmpty = value;
    })
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe( user => {
      this.loggedInUser = user;
    })
  }

  calculateTotal(): number{
    let totalPrice = 0;
    for (const orderProduct of this.orderProducts) {
      totalPrice += orderProduct.product.price * orderProduct.quantity
    }
    return totalPrice;
  }

  totalItemsInCart(): number{
    let quantity = 0;
    for (const orderProduct of this.orderProducts) {
      quantity += orderProduct.quantity
    }
    return quantity;
  }

  removeItem(orderProduct: OrderProduct) {
    const index = this.orderProducts.indexOf(orderProduct);
    if (index > -1) {
      this.orderProducts.splice(index, 1);
      this.orderProducts = this.cartService.getCart();
    }
    if (this.orderProducts.length===0){
      this.cartService.clearCart();
      this.cartEmpty = true;
    }
  }

  placeOrder(orderProducts: any){
    const order = {productOrders: orderProducts}
    this.orderService.createOrder(order);
  }
}
