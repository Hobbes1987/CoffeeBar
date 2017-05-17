import { getTestBed } from '@angular/core/testing';
import { ApiService } from './../api.service';
import { Order, Status } from '../objects/order';
import { Product } from '../objects/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public order:Order; 
  public orders:Order[]; 

  constructor(private api:ApiService) {
    //temp:
    this.getOrders();
  }

  // New order, button is pressed
  startNewOrder():void{
    
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
      });
  }

  // clear everything
  cancelOrder():void{
    this.order = null;
  }

  // Ordering is finished, button is pressed
  confirmOrder():void{

    // remove all the products that have a quantity of zero
    for(var i = this.order.Products.length - 1; i >= 0; i--) {
        if(this.order.Products[i].Qty == 0) {
          this.order.Products.splice(i, 1);
        }
    }

    // if no products remaing then do nothing
    // we don't want to place an empty order
    if( this.order.Products.length == 0){
      this.order = null;
      return;
    }

    if(this.order._id) {
      // send the order to the api
      this.api.UpdateOrder(this.order).subscribe(()=>{
        this.order = null;
      });
    }
    else {
      // send the order to the api
      this.api.PlaceOrder(this.order).subscribe(()=>{
        this.order = null;
      });
    }
  }

  // +1 of a product
  addProduct(product:Product):void{
    product.Qty = product.Qty+1;
  }

  // -1 of a product
  subtractProduct(product:Product):void {
    if(product.Qty > 0){
      product.Qty = product.Qty-1;
    }
  }

  // temp, doesn't belong here
  getOrders():void{
    this.api.GetOrders().subscribe((result) => {
      this.orders = result;
    })
  }
  selectOrder(order:Order):void{
    this.order = order;
  }

  // sum the price of all ordered products
  totalPrice():Number {
    if(this.order.Products == null)
      return 0;

    var total = 0;
    for( let product of this.order.Products) {
      total = total + (product.Qty * product.Price);
    }
    return total;
  }

  ngOnInit() {}

}