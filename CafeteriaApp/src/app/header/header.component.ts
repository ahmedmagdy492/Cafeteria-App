import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth : AuthService, private router : Router, public dom : DomSanitizer) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.auth.logout();
    location.replace('/login');
  }

  goto()
  {
    this.router.navigate(['/login']);
  }

}
