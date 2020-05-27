import { User } from './user';
import { OrderProduct } from './order-product';

export interface MyOrder {
    Id : number;
    Notes : string;
    User : User;
    UserId : string;
    OrderProducts : OrderProduct[];
}
