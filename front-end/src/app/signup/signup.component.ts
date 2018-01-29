import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  SignUp(f: NgForm, res) {

    if(!f.value.agree){
      return console.log("aggreement boc unchecked")
    }


    let obj = {
      username: f.value.username,
      password: f.value.password
    }
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });
    // let checkbox = (document.getElementById("checkbox2"))
    // if (!checkbox.checked) {
    //   return res.status(400).send("Have not agreed to terms and service");
    // }
    this.http.post("http://localhost:3000/api/user/new", obj, options)
      .subscribe(
      result => {
        console.log("Sign up success");
        this.route.navigate(['/']);
      },
      error => {
        console.log("Sign up Failed");
      }
      );

  }

}