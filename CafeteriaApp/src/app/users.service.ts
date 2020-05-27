import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url : string = "https://localhost:44314/api/Users";
  constructor(private http : HttpClient) { }

  getAll()
  {
    return this.http.get(this.url);
  }

}
