import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  cartProducts: any[]
  // bill: any;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.loadCartList()
  }

  loadCartList() {
    let data = localStorage.getItem('cart');
    // let data = JSON.parse(localStorage.getItem('cart'))
    if (data != null) {
      this.cartProducts = JSON.parse(data);
      // this.bill = 0;
      console.log(this.cartProducts)
    } else {
      this.cartProducts = []
      console.log(this.cartProducts)
    }
  }

  // getSum(index: number) : number {
  //   let sum = 0;
  //   for(let i = 0; i < this.cartProducts.length; i++) {
  //     sum += this.cartProducts[i][index];
  //   }
  //   return sum;
  // }

  removeItem(id) {
    this.cartProducts.splice(id, 1);
    if (this.cartProducts.length) {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } else {
      localStorage.setItem('cart', null);
    }
  }

  // updateTotal() {
  //   this.bill = 0;
  //   for(let i in this.cartProducts){
  //     this.bill = this.bill += (this.cartProducts[i].price * this.cartProducts[i].qt);
  //   }
  // }


  checkout() {
    // sessionStorage.removeItem("cartProducts")
    // localStorage.removeItem("cartProducts")
    alert("THANK YOU FOR SHOPPING! GOOD BYE!");
    delete localStorage.cart;
    delete sessionStorage.cart;
    // this.cartProducts.splice(0);
    this.router.navigate['/cart']
  }


  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate['/']
  }

}
