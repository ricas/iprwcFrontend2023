import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {


  constructor(private addProductDialog: MatDialogRef<AddProductModalComponent>,
              private productService: ProductService) {
  }

  closeDialog() {
    this.addProductDialog.close();
  }

  onSubmit(form: NgForm){
    const newProduct= {
      id: null,
      name: form.value.productName,
      description: form.value.description,
      price: form.value.price,
      imageUrl: form.value.url
    }
    this.productService.addProduct(newProduct)

    form.reset()
    this.closeDialog()
  }

}
