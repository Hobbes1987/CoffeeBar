import { Product } from '../objects/product';
import { OrderService } from './../order.service';
import { Order, Status } from './../objects/order';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  products:Product[];
  orders:Order[];
  constructor(private api:ApiService, private orderService:OrderService) { }

  ngOnInit() {
    this.api.GetOrders().subscribe((result)=>{
      this.orders = result.filter((order)=>{return order.Status == Status.Delivered});
      this.products = [];
      for(let order of this.orders){
        this.products = this.products.concat(order.Products);
      }
    });
  }

  // sum the price of all ordered products
  totalPrice(order:Order):Number {
    return this.orderService.TotalSalesPrice(order);
  }

  sumAll():number{
    return this.orderService.SumAll(this.orders);
  }

  totalQty(products:Product[]):number{
    return this.orderService.TotalQty(products);
  }

  totalPricePerProduct(products:Product[]):number{
    return this.orderService.TotalSalesPriceProducts(products);
  }

}
