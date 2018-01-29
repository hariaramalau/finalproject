import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit {

  productsList: any[]
  obj = <any>{};
  type;
  productsCategory = ["all products", "headphones", "microphones"].sort()
  cartProducts: any;

  constructor(private http: Http, private actroute: ActivatedRoute, private router: Router) {

    this.actroute.queryParams.subscribe(params => {
      this.type = params['type'];
      console.log(this.type); // Print the parameter to the console. 
    });
  }

  ngOnInit() {

    this.actroute.params.subscribe(params => {
      this.loadItemDetail(params['id'])
    })

  }

  loadItemDetail(id) {

    this.http.get("http://localhost:3000/api/products/" + id)
      .subscribe(
      result => {
        this.obj = result.json();
        console.log(this.obj)
      },
      error => {
        console.log("error")
      }
      )
  }

  addToCart(index) {

    let product = this.productsList[index]
    let cartData = []
    let data = localStorage.getItem("cart")
    console.log(data)
    if (data != null) {
      cartData = JSON.parse(data);

    }
    console.log(cartData)
    cartData.push(product);
    this.updateCartData(cartData)

    localStorage.setItem("cart", JSON.stringify(cartData))
    this.router.navigate(['/cart']);
  }

  updateCartData(cartData) {
    this.cartProducts = cartData
  }

}