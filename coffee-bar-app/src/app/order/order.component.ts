import { ApiService } from './../api.service';
import { Order, Status } from './../objects/order';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

loading:boolean = false;
@Input() public index:number;
@Input() public order:Order;
@Output() public orderRemoved:EventEmitter<Order> = new EventEmitter();
@Output() public orderStarted:EventEmitter<Order> = new EventEmitter();

  constructor(private api:ApiService, private elRef:ElementRef) { }

  ngOnInit() {
  }

start(){
  if(this.loading)return;
  this.loading = true;

  let test =  this.elRef.nativeElement;
  this.order.Status=Status.Preparing;
  this.api.UpdateOrder(this.order).subscribe(()=>{
    this.orderStarted.emit(this.order);    
   },()=>{
    this.order.Status=Status.Pending;    
  },()=>this.loading = false);
}
ready(){
  if(this.loading)return;
  this.loading = true;
  this.order.Status=Status.Ready;
  this.api.UpdateOrder(this.order).subscribe(()=>{ },function(){
    this.order.Status=Status.Preparing;    
  },()=>this.loading = false);
}
confirm(){
  if(this.loading)return;
  this.loading = true;
this.order.Status=Status.Delivered;
 this.api.UpdateOrder(this.order).subscribe(()=>{
   this.orderRemoved.emit(this.order);
  },function(){
    this.order.Status=Status.Ready;    
  },()=>this.loading = false);
}

delete(){
  if(this.loading)return;
  if(confirm("Wil je deze bestelling echt verwijderen?")) {
    this.loading = true;
    var oldStatus = this.order.Status;
    this.order.Status = Status.Cancelled;
    this.api.UpdateOrder(this.order).subscribe(()=>{
      this.orderRemoved.emit(this.order);
      },function(){
        this.order.Status = oldStatus;
      },()=>this.loading = false);
  }
}

}
