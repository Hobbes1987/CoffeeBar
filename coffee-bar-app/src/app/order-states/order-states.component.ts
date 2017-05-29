import { OrderService } from './../order.service';
import { Product } from './../objects/product';
import { Order } from './../objects/order';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-states',
  templateUrl: './order-states.component.html',
  styleUrls: ['./order-states.component.css']
})
export class OrderStatesComponent implements OnInit {

  orders:Order[];
  constructor(private api:ApiService, private orderService:OrderService) { 
    this.getOrders();

    setInterval(() => { this.getOrders() }, 1000*5);
  }

  getOrders(){
    this.api.GetPendingOrders().subscribe((result)=>{
        
        this.orders = result;
      });
  }

  orderedProducts(order:Order):Product[] {
    return this.orderService.ProductInstances(order);
  }

  ngOnInit() {
  }

}
