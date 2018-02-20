import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkbox = false

  constructor(private http: Http, private router: Router) {
  }

  ngOnInit() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

  }

  checkboxChecked(n) {
    if (n.target.checked) {
      this.checkbox = true
    } else {
      this.checkbox = false
    }
    console.log(this.checkbox)
  }

  Login(f: NgForm) {

    let obj = {
      username: f.value.username,
      password: f.value.password
    }
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    // let checkbox = (document.getElementById("checkbox1"))

    this.http.post("http://localhost:3000/api/user/login", obj, options)
      .subscribe(
      result => {
        if (this.checkbox == true) {
          localStorage.setItem("token", result.json().token);
          localStorage.setItem("username", result.json().username)
          localStorage.setItem("userid", result.json().userid)
        } else {
          sessionStorage.setItem("token", result.json().token);
          sessionStorage.setItem("username", result.json().username)
          sessionStorage.setItem("userid", result.json().userid)
        }
        this.router.navigate(['/home']);
        console.log("Login success")
        console.log("userID = " + sessionStorage.getItem("userid"))
        console.log("userID = " + localStorage.getItem("userid"))
      },

      error => {
        console.log("User Not Found !");
      }
      );

  }

}