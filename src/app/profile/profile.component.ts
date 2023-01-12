import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/services/order.service";
import {Order} from "../shared/models/Order";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{

  userOrders: Order[] = [];
  user!: User;

  constructor(private authService: AuthenticationService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(user => {
      this.user = user;
    })
    this.orderService.getUserOrders().subscribe(orders => {
      this.userOrders = orders });
  }

  signOut(){
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
