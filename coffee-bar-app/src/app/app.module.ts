import { OrderService } from './order.service';
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
import { SalesComponent } from './sales/sales.component';
import { GroupByPipe } from './group-by.pipe';

const appRoutes: Routes = [
  { path: 'orders', component: OrderScreenComponent },
  { path: 'newOrder', component: ProductListComponent },
  { path: 'states', component: OrderStatesComponent } ,
  { path: 'sales', component: SalesComponent } ,
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
    ProductEditComponent,
    SalesComponent,
    GroupByPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
