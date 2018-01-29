import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ItemdetailComponent } from './itemdetail/itemdetail.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DatabaseComponent } from './database/database.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ItemdetailComponent,
    CatalogueComponent,
    DatabaseComponent,
    ShoppingcartComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "catalogue", component: CatalogueComponent },
      { path: "detail/:id", component: ItemdetailComponent },
      { path: "db", component: DatabaseComponent },
      { path: "cart", component: ShoppingcartComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
