import { Product } from './../objects/product';
import { Order, Status } from './../objects/order';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css']
})
export class OrderScreenComponent implements OnInit {

  grid:GridItem[];
  orders:Order[];

  constructor(private api:ApiService) { 
  }

  ngOnInit() {
    this.getOrders();

    setInterval(() => { this.getOrders() }, 1000*10);
  }

getOrders(){
 this.api.GetPendingOrders().subscribe((result)=>{
      result.reverse();
      this.orders = result;
      this.grid = [];
     for(let y=0;y<2;y++){
      for(let x=0;x<5;x++){

          let o = this.orders.filter((order)=>{return order.Row == y && order.Column == x});
          let item = new GridItem();
          item.x = x;
          item.y = y;
          item.order = o.length > 0 ? o[0] : null;

            this.grid.push(item);
          }
      }
    });
}

  removeOrder(order:Order){
    this.orders.splice(this.orders.indexOf(order),1);
    let filteredItems = this.grid.filter((gridItem)=>{
      return gridItem.order == order;
    });
    if(filteredItems.length>0)
      filteredItems[0].order = null;
  }

  orderStarted(order:Order) {
    //find first free spot on page
   let spot = this.findFreeSpot();
   if(spot == null) {
     order.Status = Status.Pending; 
   }
   else
  {
    order.Row = spot.y;
    order.Column = spot.x;
    spot.order = order;
    }
    this.api.UpdateOrder(order).subscribe(()=>{});
  }
  

  findFreeSpot():GridItem{
    let filteredItems = this.grid.filter((gridItem)=>{
      return gridItem.order == null && this.grid.indexOf(gridItem) != this.grid.length-1;
    });

    if(filteredItems.length == 0){
      alert("geen lege plekken");
      return null;
    }
    
    if(filteredItems.length > 0){
      return filteredItems[0];
    }
  }
}

 class GridItem{
  x:number;
  y:number;
  order:Order;
}
