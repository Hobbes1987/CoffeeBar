import { Order } from './../objects/order';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css']
})
export class OrderScreenComponent implements OnInit {

  orders:Order[];
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.GetPendingOrders().subscribe((result)=>{
      this.orders = result;
    });
  }

}
