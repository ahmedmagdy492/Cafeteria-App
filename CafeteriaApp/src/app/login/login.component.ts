import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isSubmitted : boolean;
  @ViewChild("btnLogin")
  btnLogin : MatButton;

  constructor(private auth : AuthService, private fb : FormBuilder, private router : Router,private toast : ToastrService) { 
    this.loginForm = fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit()
  {
    this.isSubmitted = true;
    this.btnLogin.disabled = true;
    this.auth.login(this.loginForm.controls.Username.value, this.loginForm.controls.Password.value).subscribe(res => {      
      this.isSubmitted = false;
      this.btnLogin.disabled = false;
      if((res as any).role == 'Admin')
        this.router.navigate(['/categories']);
      else
        this.router.navigate(['/products']);
      localStorage.setItem("userInfo", JSON.stringify(res));
    },
    err => {
      this.isSubmitted = false;
      this.btnLogin.disabled = false;    
      if(err  instanceof HttpErrorResponse)
      {
        if(err.status == 400)
          this.toast.error("Invalid UserName or Password", "Error");
        else
          this.toast.error(err.status.toString(), err.message);
      }
      else
      {
        this.toast.error(err.status.toString(), err.message);
      }
    }
    );
  }

}
