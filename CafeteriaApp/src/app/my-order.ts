import { OrderProduct } from './order-product';
export interface MyOrder {
    Id : number;
    Notes : string;
    User;
    UserId : string;
    OrderProducts : OrderProduct[];
}
