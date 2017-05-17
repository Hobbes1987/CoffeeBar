import { Order } from './../objects/order';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

@Input() public order:Order;

  constructor() { }

  ngOnInit() {
  }

}
