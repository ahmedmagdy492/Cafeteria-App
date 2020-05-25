import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string = "https://localhost:44314/api/Account/";
  helper : JwtHelperService;
  private currentTime;

  constructor(private http : HttpClient) {     
    this.currentTime = new Date();
  }

  register(user : User)
  {    
    return this.http.post(this.url + "register" ,user);
  }

  login(username : string, pass : string)
  {
    let header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept":"application/x-www-form-urlencoded"
    })
    return this.http.post("https://localhost:44314/token", `
      username=${username}&password=${pass}&grant_type=password`
    ,{headers: header});
  }

  get isAuthenticated()
  {
    var object : any = localStorage.getItem('userInfo');
    if(object != null)
    {      
      var userInfo = JSON.parse(object);      
      var expires = new Date(userInfo[".expires"]);
      if(this.currentTime < expires)
      {        
        return true;
      }
      else
        return false;
    }    
    return false;        
  }

  get userName()
  {
    var object : any = localStorage.getItem('userInfo');
    if(object != null)
    {      
      var userInfo = JSON.parse(object);
      return userInfo.userName;
    }
    return null
  }

  get isAdmin()
  {
    var object : any = localStorage.getItem("userInfo");
    if(object != null)
    {
      var userInfo = JSON.parse(object);
      return userInfo.role == "Admin" ? true : false;
    }
    return false;
  }

  get getUserImg()
  {
    var object : any = localStorage.getItem("userInfo");
    if(object != null)
    {
      var userInfo = JSON.parse(object);
      return userInfo.img;
    }
    return null;
  }
  
  logout()
  {
    localStorage.removeItem("userInfo");
  }

}
