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

  orders:Order[];
  constructor(private api:ApiService, private orderService:OrderService) { }

  ngOnInit() {
    this.api.GetOrders().subscribe((result)=>{
      this.orders = result.filter((order)=>{return order.Status == Status.Delivered});
    });
  }

  // sum the price of all ordered products
  totalPrice(order:Order):Number {
    return this.orderService.TotalSalesPrice(order);
  }

}
