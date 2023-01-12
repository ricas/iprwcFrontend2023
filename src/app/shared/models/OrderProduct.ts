import {Product} from "./Product";

export class OrderProduct {

  constructor(public product: Product, public quantity: number) {
  }

  public static orderProductFromObject(object:any){
    return new OrderProduct(object["product"],object["quantity"])
  }
}
