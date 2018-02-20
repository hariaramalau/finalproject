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
    console.log("logged out. All Storage cleared")
  }
}


