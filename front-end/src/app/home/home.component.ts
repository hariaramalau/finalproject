import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any


  constructor(private http: Http, private router: Router, private actroute: ActivatedRoute) { }

  ngOnInit() {
    // this.tokenValidation()
  }

  // tokenValidation() {

  //   if (!sessionStorage.getItem("token")) {
  //     this.token = localStorage.getItem("token")
  //     console.log(this.token + " local")

  //   }
  //   if (!localStorage.getItem("token")) {
  //     this.token = sessionStorage.getItem("token")
  //     console.log(this.token + " session")
  //   }
  //   if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
  //     this.router.navigate(['/']);
  //   }

  //   let header = new Headers({ "Authorization": "Bearer " + this.token });
  //   let options = new RequestOptions({ headers: header });
  //   this.http.post("http://localhost:3000/api/validatetoken", {}, options)
  //     .subscribe(
  //     result => {
  //       console.log(result.json())
  //       console.log("Logged in")
  //     },
  //     error => {
  //       sessionStorage.removeItem("token");
  //       sessionStorage.removeItem("username")
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("username")
  //       this.router.navigate(['/'])
  //       console.log("Not Logged in")
  //     }
  //     )

  // }

  loggedIn(token) {
    if (token = null) {
      return false;
    }
    else return true;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate['/']
  }
}


