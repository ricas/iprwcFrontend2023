import { Component } from '@angular/core';
import {AuthenticationService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usernameExists: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  submit(f : NgForm) {
    let username: string = f.value.username;
    let password: string = f.value.password;
    let email: string = f.value.email;
    let name: string = f.value.name;

    this.authService.register(username, password, email, name).subscribe({
      next: ()=> this.router.navigate(['login']),
      error: ()=> this.usernameExists = true
    })
  }
}
