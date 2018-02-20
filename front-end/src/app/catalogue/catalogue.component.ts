import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  productsList = [];
  productsCategory = ["all products", "microphone", "headphones"];
  type;
  cartProducts: any;
  token: any

  constructor(private http: Http, private router: Router, private actroute: ActivatedRoute) {
    this.actroute.queryParams.subscribe(params => {
      this.type = params['type'];
      console.log(this.type); // Print the parameter to the console. 
      this.onChangeParam()
    });
  }

  ngOnInit() {

    this.loadProductsList();

  }

  loadProductsList() {

    this.http.get("http://localhost:3000/api/products")
      .subscribe(
      result => {
        console.log("works");
        this.productsList = result.json();
        console.log(this.productsList);
      },
      error => {
        console.log("error");
      }
      );
  }

  onChangeParam() {

    if (this.type == undefined) {
      this.loadProductsList()
    } else {
      this.http.get("http://localhost:3000/api/products?type=" + this.type)
        .subscribe(
        result => {
          this.productsList = result.json();

          console.log(this.productsList);
        },
        error => {
          console.log("Get productList error");
        }
        )
    }

  }

  addToCart(index) {

    if (!sessionStorage.getItem("token")) {
      this.token = localStorage.getItem("token")
      console.log(this.token + " local")
    }
    if (!localStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token")
      console.log(this.token + " session")
    }
    if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
      this.router.navigate(['/']);
    }
    let header = new Headers({ "Authorization": "Bearer " + this.token });
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
      result => {

        let product = this.productsList[index]
        console.log(product);
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

        console.log(result.json())
      },
      error => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username")
        this.router.navigate['/']
        console.log("logincuy")
      }
      )

    //endfunc
  }

  updateCartData(cartData) {
    this.cartProducts = cartData
  }



  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate['/']
    console.log("logged out. All Storage cleared")
  }

}