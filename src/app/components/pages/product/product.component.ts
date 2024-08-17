import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public product: ProductType = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: '',
  }

  private subscribe: Subscription | null = null;
  private subscribeRequest: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private commonService:CommonService,private router: Router) {
  }

  ngOnInit(): void {
    this.subscribe = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let product: ProductType | undefined = undefined;
        if (this.productService.products.length === 0) {
          this.subscribeRequest = this.productService.getProducts().subscribe({
            next: data => {
              product = data.find(product => product.id === +params['id']);
              if (product) {
                this.product = product;
              }
            },
            error: error => {
              this.router.navigate(['/'])
            }
          });
        } else {
          product = this.productService.getProduct(+params['id']);
          if (product) {
            this.product = product;
          }
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
    this.subscribeRequest?.unsubscribe();
  }
  selectProduct(){
    this.commonService.product=this.product.title;
  }
}
