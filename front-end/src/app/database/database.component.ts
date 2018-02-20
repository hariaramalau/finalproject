import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

declare var $: any;

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  productsList = [];
  productsCategory = ["all products", "microphone", "headphones"];
  type;
  obj = <any>{};
  file;
  imagePath = "";
  // admin = sessionStorage.getItem("userid")
  token: any;

  constructor(private http: Http, private router: Router, private actroute: ActivatedRoute) { }

  ngOnInit() {

    if (localStorage.getItem("userid") == '5a87fcad104a6d1510f111d5') {
      this.token = localStorage.getItem("token")
      console.log(this.token + " User Authorized Admin Privilege")
    }
    else if (sessionStorage.getItem("userid") == '5a87fcad104a6d1510f111d5') {
      this.token = sessionStorage.getItem("token")
      console.log(this.token + " User Authorized Admin Privilege")
    }
    else {
      this.router.navigate(['/'])
      console.log("login dulu bray admin")
    }


    let header = new Headers({ "Authorization": "Bearer " + this.token });
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
      result => {

        console.log("admin is in");
        this.loadProductsList();
      },
      error => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username")
        this.router.navigate['/']
        console.log("logincuy")
      }
      )




  }



  loadProductsList() {

    this.http.get("http://localhost:3000/api/products")
      .subscribe(
      result => {
        console.log("inventory start");
        this.productsList = result.json();
        console.log(this.productsList);
      },
      error => {
        console.log("error");
      }
      );
  }

  ResetForm(s: NgForm) {
    s.reset();
  }

  fileChange($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  onSubmit(s: NgForm) {
    console.log(s.value.name);
    let formData = new FormData();
    formData.append("picture", this.file);
    formData.append("name", s.value.name);
    formData.append("brand", s.value.brand);
    formData.append("type", s.value.type);
    formData.append("price", s.value.price);

    let header = new Headers();
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/products/new", formData, options)
      .subscribe(
      result => {
        console.log(result.json());
        // this.imagePath = result.json().path;
      },
      error => {
        console.log(error);
      },
    );
  }

  DeleteData(id) {
    let header = new Headers();
    let options = new RequestOptions({ headers: header });

    this.http.delete("http://localhost:3000/api/products/" + id, options)
      .subscribe(
      result => {
        this.loadProductsList();
      },
      error => {
        console.log(error);
      }
      );
  }

  updateData(t: NgForm) {

    let formData = new FormData();
    formData.append("_id", t.value._id);
    formData.append("picture", this.file);
    formData.append("name", t.value.name);
    formData.append("brand", t.value.brand);
    formData.append("type", t.value.type);
    formData.append("price", t.value.price);

    this.http.put("http://localhost:3000/api/products/", formData)
      .subscribe(
      result => {
        this.loadProductsList();
        $('#myModal').modal('hide');
      },
      error => {
        console.log(error);
      }
      );
  }

  editModal(id) {


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
    $('#myModal').modal('show');
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate['/']
    console.log("logged out. All Storage cleared")

  }

}
