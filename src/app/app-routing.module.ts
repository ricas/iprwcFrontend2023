import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AdminComponent} from "./auth/admin/admin.component";
import {AuthenticationGuard} from "./auth/guards/authentication.guard";
import {RoleGuard} from "./auth/guards/role.guard";
import {Role} from "./shared/models/Role";
import {ProfileComponent} from "./profile/profile.component";
import {CartComponent} from "./cart/cart.component";
import {ProductItemInfoComponent} from "./products/product-item/product-item-info/product-item-info.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: '', redirectTo: 'products', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {role: Role.ROLE_ADMIN}},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {role: Role.ROLE_USER}},
  {path: 'cart', component: CartComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {role: Role.ROLE_USER}},
  {path: 'product/:id', component: ProductItemInfoComponent, canActivate: [AuthenticationGuard, RoleGuard], data: {role: Role.ROLE_USER}},
  {path: '404', component: ErrorPageComponent},
  {path: '**',  redirectTo: '404', pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
