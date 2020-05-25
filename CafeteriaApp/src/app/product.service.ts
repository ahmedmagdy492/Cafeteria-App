import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "https://localhost:44314/api/product";
  header;

  constructor(private http: HttpClient) { 
    var obj = JSON.parse(localStorage.getItem('userInfo'));
    this.header = {
      Authorization: 'Bearer ' + obj.access_token,
      role: obj.role
    }    
  }

  addProduct(product)
  {
    return this.http.post(this.url, product,{headers: this.header});
  }

  getAll()
  {    
    return this.http.get(this.url, {headers: this.header});
  }  

  del(id : number)
  {
    return this.http.delete(this.url + "?id=" + id, {headers: this.header});
  }

  edit(id : number, product : Product)
  {
    return this.http.put(this.url + "?id=" + id, product, {headers: this.header});
  }

  availOrUn(id : number)
  {
    return this.http.post(`${this.url}?id=${id}`, {}, {headers: this.header});
  }
}
