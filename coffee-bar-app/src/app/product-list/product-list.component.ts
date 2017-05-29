import { Product } from './../objects/product';
import { OrderService } from './../order.service';
import { getTestBed } from '@angular/core/testing';
import { ApiService } from './../api.service';
import { Order, Status } from '../objects/order';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public loading:boolean = false;
  public order:Order; 
  public orders:Order[]; 
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  
  constructor(private api:ApiService, private orderService:OrderService) {

  }

  // New order, button is pressed
  startNewOrder():void{
    if(this.loading)
      return;
    
    this.loading = true;

    // create new order and set default status to pending
    this.order = new Order();
    this.order.Status = Status.Pending;

    // get all the available products from the api
    this.api.GetProducts().subscribe(
      (products)=> {
        //set all the product qty's to 0
        this.order.Products = products;
        for(let product of products)
          product.Qty = 0;
        this.loading = false;
      });
  }

  // clear everything
  cancelOrder():void{
    if(this.loading)
      return;

    this.order = null;
  }

  // Ordering is finished, button is pressed
  confirmOrder(direct:boolean):void{
    if(this.loading)
      return;

    this.loading = true;
    if(direct)
      if(!confirm('Heb je de bestelling direct meegegeven en hoeft verder niets worden klaargemaakt?')) {
        this.loading = false;
        return;
      }
      else
        this.order.Status = Status.Delivered;

    // remove all the products that have a quantity of zero
    for(var i = this.order.Products.length - 1; i >= 0; i--) {
        if(this.order.Products[i].Qty == 0) {
          this.order.Products.splice(i, 1);
        }
    }

    // if no products remaing then do nothing
    // we don't want to place an empty order
    if( this.order.Products.length == 0) {
      this.order = null;
      this.loading = false;
      return;
    }

    if(this.order._id) {
      // send the order to the api
      this.api.UpdateOrder(this.order).subscribe(()=>{
        this.order = null;
        this.loading = false;
      });
    }
    else {
      // send the order to the api
      this.order.OrderDate = new Date();
      this.api.PlaceOrder(this.order).subscribe(()=>{
        this.order = null;
        this.loading = false;
      });
    }
  }

  // +1 of a product
  addProduct(product:Product):void{
    if(this.loading)
      return;

    product.Qty = product.Qty+1;
  }

  // -1 of a product
  subtractProduct(product:Product):void {
    if(this.loading)
      return;

    if(product.Qty > 0){
      product.Qty = product.Qty-1;
    }
  }

  // sum the price of all ordered products
  totalPrice():Number {
    return this.orderService.TotalSalesPrice(this.order);
  }

  orderedProducts():Product[] {
    return this.orderService.ProductInstances(this.order);
  }

  stockProducts():Product[]{
    return this.order.Products.filter(p=>!p.OutOfStock);
  }

  ngOnInit() {}

  scrollToBottom(): void 
  {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

}
