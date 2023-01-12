import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginFailed: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  submit(f: NgForm) {
    let username : string = f.value.username;
    let password : string = f.value.password;
    this.authService.login(username, password).subscribe({
      next: ()=> this.router.navigate(['']),
      error: ()=> this.loginFailed = true
    })
  }
}
