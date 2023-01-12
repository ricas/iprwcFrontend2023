import {OrderProduct} from "./OrderProduct";

export class Order {
  productOrders: OrderProduct[] = [];
  id: number
  totalPrice: number
  dateCreated: string

  constructor(productsInOrder: OrderProduct[], id: number, totalPrice: number, numberOfProducts: number, dateCreated: string) {
    this.productOrders = productsInOrder;
    this.id = id;
    this.totalPrice = totalPrice;
    this.dateCreated = dateCreated
  }
}
