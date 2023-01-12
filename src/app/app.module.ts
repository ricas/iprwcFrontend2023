import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthModule} from "./auth/auth.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {SharedModule} from "./shared/shared.module";
import {ProductsModule} from "./products/products.module";
import {ProfileModule} from "./profile/profile.module";
import {CartModule} from "./cart/cart.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CartModule,
    ProfileModule,
    ProductsModule,
    SharedModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
