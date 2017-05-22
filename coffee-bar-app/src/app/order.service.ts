import { Product } from './objects/product';
import { Order } from './objects/order';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor() { }

  public SumAll(orders:Order[]):number{
    if(orders == null)
    return 0;
    var total = 0;
    for( let order of orders) {
      total = total + this.TotalSalesPrice(order);
    }
    return total;
  }

  public TotalSalesPrice(order:Order):number{
      if(order.Products == null)
      return 0;

    var total = 0;
    for( let product of order.Products) {
      total = total + (product.Qty * product.Price);
    }
    return total;
  }

  public TotalQty(products:Product[]):number{
      if(products == null)
      return 0;

    var total = 0;
    for( let product of products) {
      total = total + product.Qty;
    }
    return total;
  }

  public TotalSalesPriceProducts(products:Product[]):number{
      if(products == null)
      return 0;

    var total = 0;
    for( let product of products) {
      total = total + (product.Qty * product.Price);
    }
    return total;
  }
}
