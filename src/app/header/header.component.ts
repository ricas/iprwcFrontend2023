import {Component} from '@angular/core';
import {AuthenticationService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{

  newProductAddedToCart = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  checkLoginStatus(){
    this.authService.checkLoginStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['profile']);
        return;
      }
      this.router.navigate(['login']);
    });
  }
}

