import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, observable, Subscription, tap} from "rxjs";
import {CommonService} from "../../../services/common.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderConfirm: boolean = false;
  public orderError: boolean = false;
  public orderErrorMessage: string = ''
  public requestStatus: boolean = false;
  private subscriptionOrder: Subscription | null = null;
  private subscriptionError: Subscription | null = null;
  orderForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[А-ЯA-Z][а-яa-z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[А-ЯA-Z][а-яa-z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[+]{0,1}[0-9]{11}$')]],
    country: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    product: [''],
    address: ['', [Validators.required, Validators.pattern('^[0-9а-яА-Я\\s\\-\\/\\\\]+$')]],
    comment: ['']
  });

  get firstName() {
    return this.orderForm.get('firstName');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get product() {
    return this.orderForm.get('product');
  }

  get address() {
    return this.orderForm.get('address');
  }

  constructor(private fb: FormBuilder, public commonService: CommonService, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.commonService.product) {
      this.orderForm.patchValue({
        product: this.commonService.product,
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  sendForm() {
    this.requestStatus = true;
    this.subscriptionOrder = this.productService.createOrder(
      this.orderForm.get('firstName')!.value!,
      this.orderForm.get('lastName')!.value!,
      this.orderForm.get('phone')!.value!,
      this.orderForm.get('country')!.value!,
      this.orderForm.get('zip')!.value!,
      this.orderForm.get('product')!.value!,
      this.orderForm.get('address')!.value!,
      this.orderForm.get('comment')!.value!,)
      .pipe(tap(() => this.requestStatus = false))
      .subscribe(response => {
        if (response.success) {
          this.orderConfirm = true;
        } else {
          this.orderConfirm = false;
          this.orderError = true;
          if (response && response.message) this.orderErrorMessage = response.message;
          this.subscriptionOrder = new Observable((observer) => {
            const errorTimeout = setTimeout(() => {
              observer.next();
            }, 3000);
            return {
              unsubscribe: () => {
                clearTimeout(errorTimeout);
              }
            }
          }).subscribe(()=>{
            this.orderConfirm = false;
            this.orderError = false;
          });
        }
      });

  }


  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
    this.subscriptionError?.unsubscribe();
  }
}


