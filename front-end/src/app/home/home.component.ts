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

  constructor(private http: Http, private router: Router, private actroute: ActivatedRoute) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username")
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    this.router.navigate['/'];
  }
}


