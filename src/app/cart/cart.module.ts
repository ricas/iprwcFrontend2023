import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CartComponent} from "./cart.component";

@NgModule({
  declarations: [
    CartItemComponent,
    CartComponent

  ],
  imports: [
    SharedModule
  ],
  exports: [
    CartItemComponent,
    CartComponent
  ]
})
export class CartModule {

}
