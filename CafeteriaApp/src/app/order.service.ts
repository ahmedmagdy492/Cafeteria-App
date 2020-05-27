import { OrderItem } from './order-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url : string = "https://localhost:44314/api/orders";
  header;

  constructor(private http : HttpClient) { 
    var obj = JSON.parse(localStorage.getItem('userInfo'));
    this.header = {
      Authorization: 'Bearer ' + obj.access_token,
      role: obj.role
    }
  }

  submitOrder(products : OrderItem[], Notes : string)
  {
    return this.http.post(`${this.url}?Notes=${Notes}`, products, {headers: this.header});
  }

  submitManaulOrder(products : OrderItem[], Notes : string, userId : string)
  {
    const internalUrl = "https://localhost:44314/api/AdminOrders";
    return this.http.post(`${internalUrl}?Notes=${Notes}&userId=${userId}`, products, {headers: this.header});
  }

  getMyOrders()
  {
    return this.http.get(this.url, {headers: this.header});
  }

  getAllOrders()
  {
    const internalUrl = 'https://localhost:44314/api/AdminOrders';
    return this.http.get(internalUrl, {headers: this.header});
  }

  finishOrder(id : number)
  {
    const internalUrl = 'https://localhost:44314/api/AdminOrders?id='+id;
    return this.http.get(internalUrl, {headers: this.header});
  }

  applyFilter(filter : string)
  {
    const internalUrl = 'https://localhost:44314/api/AdminOrders';
    return this.http.post(internalUrl , filter, {headers: this.header});
  }
}
