import { Product } from './product';

export class Order{
    public _id:string;
    public CustomerName:string;
    public Products:Array<Product>;
    public OrderDate:Date;
    public Status:Status;
    public Row:number;
    public Column:number;
    public Delivery:boolean;
    public Note:string;
}

export enum Status{
    Pending = 0, //Aangemaakt
    Preparing = 1,
    Ready = 2,
    Delivered = 3,
    Cancelled = 4,
}