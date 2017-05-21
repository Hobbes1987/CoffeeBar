import { Order } from './objects/order';
import { Http, Response, RequestOptionsArgs, Headers } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { Product } from './objects/product';
import { Injectable } from '@angular/core';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  rootUrl:string = "http://localhost:3000/api/";
  //rootUrl:string = "../../api/";

  GetProducts() : Observable<Product[]> {
      return this.http.get(this.rootUrl + "products")
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetOrders() : Observable<Order[]> {
      return this.http.get(this.rootUrl + "orders")
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetPendingOrders() : Observable<Order[]> {
      return this.http.get(this.rootUrl + "orders/pending")
                      .map((res:Response) => res.json())
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  PlaceOrder(order:Order) : Observable<any> {
      return this.http.post(this.rootUrl + "order",order)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  UpdateOrder(order:Order) : Observable<any> {
      return this.http.post(this.rootUrl + "order/"+order._id,order)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  AddProduct(product:Product) : Observable<any> {
      return this.http.post(this.rootUrl + "product",product)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
   UpdateProduct(product:Product) : Observable<any> {
      return this.http.post(this.rootUrl + "product/"+product._id,product)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  DeleteProduct(product:Product) : Observable<any> {
      return this.http.post(this.rootUrl + "product/delete/"+product._id,product)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
     
  public GetProductsMocked():Array<Product>{

    var p1 = new Product();
    p1.Name = "Kopje koffie";
    p1.Category = "Dranken";
    p1.Price = 1.5;
    p1.Qty = 0;

    var p2 = new Product();
    p2.Name = "Kopje thee";
    p2.Category = "Dranken";
    p2.Price = 0.99;
    p2.Qty = 0;

    var p3 = new Product();
    p3.Name = "Slagroomtaart";
    p3.Category = "gebak";
    p3.Price = 0.99;
    p3.Qty = 0;

    var p4 = new Product();
    p4.Name = "koekje";
    p4.Category = "gebak";
    p4.Price = 10;
    p4.Qty = 0;

    return [p1,p2,p3,p4];
  }

  constructor(private http: Http) { }

}
