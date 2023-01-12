import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {RouterModule} from "@angular/router";
import {AuthenticationService} from "./auth.service";
import {HttpClientModule} from "@angular/common/http";
import {AdminComponent} from "./admin/admin.component";
import { AddProductModalComponent } from './admin/add-product-modal/add-product-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AddProductModalComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AddProductModalComponent
  ],
  imports: [
    RouterModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [
    JwtHelperService,
    AuthenticationService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
  ]
})
export class AuthModule { }
