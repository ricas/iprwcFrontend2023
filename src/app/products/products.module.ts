import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductItemInfoComponent} from "./product-item/product-item-info/product-item-info.component";
import {ProductItemComponent} from "./product-item/product-item.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ProductItemInfoComponent

  ],
  imports: [
    SharedModule],
  exports: [
    ProductsComponent,
    ProductItemComponent,
    ProductItemInfoComponent
  ]
})
export class ProductsModule {

}
