import { Order } from './objects/order';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor() { }

  public TotalSalesPrice(order:Order):Number{
      if(order.Products == null)
      return 0;

    var total = 0;
    for( let product of order.Products) {
      total = total + (product.Qty * product.Price);
    }
    return total;
  }
}
