import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StatusNamePipe } from './status-name.pipe';
import { OrderScreenComponent } from './order-screen/order-screen.component';
import { OrderComponent } from './order/order.component';
import { OrderStatesComponent } from './order-states/order-states.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const appRoutes: Routes = [
  { path: 'orders', component: OrderScreenComponent },
  { path: 'newOrder', component: ProductListComponent },
  { path: 'states', component: OrderStatesComponent } ,
  { path: 'products', component: ProductEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StatusNamePipe,
    OrderScreenComponent,
    OrderComponent,
    OrderStatesComponent,
    ProductEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
