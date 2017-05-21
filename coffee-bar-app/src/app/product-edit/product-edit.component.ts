import { Product } from './../objects/product';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  products:Product[];
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.get();
  }
  get(){
    this.api.GetProducts().subscribe((products)=>{
        this.products = products;
    })
  }

  add(){
    let product:Product = new Product();
    product.Name = "Nieuw";
    product.Price = 0;
    product.Qty = 0;
    this.api.AddProduct(product).subscribe(()=>{
      this.get();      
    });
  }

  save(product:Product){
    this.api.UpdateProduct(product).subscribe(()=>{
      this.get();      
    });
  }

  delete(product:Product){
    this.api.DeleteProduct(product).subscribe(()=>{
      this.get();      
    });
  }
}
