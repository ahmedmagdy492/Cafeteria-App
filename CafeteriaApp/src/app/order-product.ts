import { Product } from './product';
export interface OrderProduct {
    Id : number;
    OrderDate : Date;
    OrderId: number;
    ProductId : number;
    Quantity : number;
    Product : Product[];
}
