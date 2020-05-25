import { Product } from './product';

export interface OrderItem {
    products : Product;
    quantity : number;    
}
