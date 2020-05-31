import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {

  url : string = "https://localhost:44314/api/Checks";
  header;

  constructor(private http : HttpClient) {
    var obj = JSON.parse(localStorage.getItem('userInfo'));
    this.header = {
      Authorization: 'Bearer ' + obj.access_token,
      role: obj.role
    }
  }

  getAll(userId : string, fromDate : string, toDate : string)
  {
    return this.http.get(`${this.url}?userId=${userId}&fromDate=${fromDate}&toDate=${toDate}`, {headers: this.header});
  }

}
