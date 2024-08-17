import {Injectable} from "@angular/core";
import {ProductType} from "../types/product.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {OrderRequestType} from "../types/order-request.type";
import {ResponseType} from "../types/response.type";

@Injectable()
export class ProductService {
  public products: ProductType[] = [];

  public filterSubject$: Subject<string|null> = new Subject<string|null>();

  constructor(private http: HttpClient) {

  }

  getProducts( filter?:string): Observable<ProductType[]> {
    if (filter){
      let params = new HttpParams();
      params=params.set('search',filter);
      return this.http.get<ProductType[]>('https://testologia.ru/tea',{params:params});
    }else{
      return this.http.get<ProductType[]>('https://testologia.ru/tea');
    }
  }


  getProduct(id: number): ProductType | undefined {
    return this.products.find(product => product.id === id);
  }

  createOrder(name: string, lName: string, phone: string, country: string, zip: string, product: string, address: string, comment: string | null): Observable<ResponseType> {
    const orderData: OrderRequestType = {
      name: name,
      last_name: lName,
      phone: phone,
      country: country,
      zip: zip,
      product: product,
      address: address
    };
    if (comment) orderData.comment = comment;
    return this.http.post<ResponseType>(`https://testologia.ru/order-tea`, orderData);
  }
}

