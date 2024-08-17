import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public filter:string='';
  public subscriptionParams:Subscription | null = null;
  constructor( private router: Router, private activatedRoute:ActivatedRoute) {

  }

ngOnInit(): void {
  this.subscriptionParams = this.activatedRoute.queryParams.subscribe((params) => {
    if (params['search']) {
      this.filter = params['search'];
    }
  });
}

clearFilter(){
    if(!this.filter){
      this.router.navigate(['/catalog']);
    }
}

}
