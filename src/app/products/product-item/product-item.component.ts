import {Component, Input} from '@angular/core';
import {Product} from "../../shared/models/Product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']})
export class ProductItemComponent {

  @Input() products!: Product[];
  @Input() product!: Product;

  constructor(private router: Router) {
  }

  openProductModal(id: number){
    this.router.navigate(['product', id]);
  }
}
