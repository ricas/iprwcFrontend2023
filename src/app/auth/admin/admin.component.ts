import {Component, OnInit} from '@angular/core';
import {Order} from "../../shared/models/Order";
import {Product} from "../../shared/models/Product";
import {User} from "../../shared/models/User";
import {ProductService} from "../../shared/services/product.service";
import {UserService} from "../../shared/services/user.service";
import {OrderService} from "../../shared/services/order.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductModalComponent} from "./add-product-modal/add-product-modal.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProductService, UserService, OrderService]
})
export class AdminComponent implements OnInit{
  userOrders: Order[] = [];
  products: Product[] = [];
  users: User[] = [];

  constructor(private productService: ProductService,
              private userService: UserService,
              private orderService: OrderService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.users = this.users.filter(user => user.username !== localStorage.getItem("username"))
    });
    this.orderService.getAllOrders().subscribe(orders => {
      this.userOrders = orders;
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.productService.getProducts();
    });
  }

  deleteUser (id: number) {
    this.userService.deleteById(id)
  }

  deleteProduct (id: number) {
    this.productService.deleteById(id);
  }
}
