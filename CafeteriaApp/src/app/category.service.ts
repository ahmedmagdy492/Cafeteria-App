import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url : string = "https://localhost:44314/api/category";
  header;
  
  constructor(private http : HttpClient) { 
    var userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;    
    this.header = new HttpHeaders({
      "Authorization": "Bearer " + userInfo.access_token 
    })
  }

  getAll()
  {
    return this.http.get(this.url, {headers: this.header});
  }

  add(category)
  {
    return this.http.post(this.url, category, {headers: this.header});
  }

  del(id : number)
  {
    return this.http.delete(this.url + "?id=" + id, {headers: this.header});
  }

  edit(category, id : number)
  {
    return this.http.put(this.url + "?id=" + id, category, {headers: this.header});
  }

}
