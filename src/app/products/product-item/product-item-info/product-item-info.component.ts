import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ProductService} from "../../../shared/services/product.service";
import {AuthenticationService} from "../../../auth/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-product-item-info',
  templateUrl: './product-item-info.component.html',
  styleUrls: ['./product-item-info.component.css'],
  providers: [ProductService, AuthenticationService, CartService]
})
export class ProductItemInfoComponent implements OnInit{

  product!: any;
  url = environment.server + environment.endpoints.products
  productAmount = 1;
  formIsInvalid = false;
  productAmountControl = new FormControl(this.productAmount, [
    Validators.min(1), Validators.max(99)
  ]);

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthenticationService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.productAmount = 1;
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe(product =>
        this.product = product)
    });
  }

  validateInput(){
    const amount = Number(this.productAmountControl.value)
    if (amount > 99) {
      this.productAmountControl.setValue(99);
      this.productAmount = 99;
    }
    if (amount < 1) {
      this.productAmountControl.setValue(1);
      this.productAmount = 1;
    }
    if (typeof this.productAmountControl.value !== 'number'){
      this.productAmountControl.setValue(1)
      this.productAmount = 1;
    }
    if (amount >= 1 && amount <= 99) {
      this.productAmountControl.setValue(amount)
      this.productAmount = amount;
    }
  }

  increaseByOne(){
    if (this.productAmountControl.value! < 99) {
      this.productAmount = Number(this.productAmount) + 1;
      this.productAmountControl.setValue(this.productAmountControl.value! + 1);
    }
  }

  decreaseByOne(){
    if (this.productAmountControl.value! >= 2) {
      this.productAmount -= 1;
      this.productAmountControl.setValue(this.productAmountControl.value! - 1);
    }
  }

  onSubmit(){
    if (!this.productAmountControl.valid){
      this.formIsInvalid = true;
      return;
    }
    this.formIsInvalid = false;
    this.cartService.addToCart(this.product, this.productAmount);
  }
}
