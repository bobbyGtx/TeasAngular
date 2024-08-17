import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'product-card-component',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product:ProductType;

  constructor(public productService: ProductService) {
    this.product={
      id:0,
      image:'',
      title:'',
      price:0,
      description:'',
    }
  }

  ngOnInit(): void {
  }

}
