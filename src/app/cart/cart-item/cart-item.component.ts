import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderProduct} from "../../shared/models/OrderProduct";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {

  @Input() orderProduct!: OrderProduct | null;
  @Output() itemRemoved = new EventEmitter<OrderProduct>();

  constructor(private cartService: CartService) {}

  removeFromCart(orderProduct: OrderProduct) {
    this.cartService.removeFromCart(orderProduct);
    this.orderProduct = null;
    this.itemRemoved.emit(orderProduct)
  }
}
