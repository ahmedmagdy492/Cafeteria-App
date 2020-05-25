import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  isSubmitted : boolean;
  @ViewChild("btnRegister")
  btnRegister : MatButton;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private auth: AuthService, private fb : FormBuilder, private router : Router,private toast : ToastrService) 
  { 
    this.registerForm = fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      ImgUrl: ['']
    });
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event)
  {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  submit()
  {
    this.isSubmitted = true;
    this.btnRegister.disabled = true;
    var img : string = this.croppedImage;
    this.registerForm.value.ImgUrl = img.substring(22);
    this.auth.register(this.registerForm.value).subscribe(data => {            
      this.isSubmitted = false;
      this.btnRegister.disabled = false;
      this.router.navigate(['/login']);
      },
      err => {
        if(err instanceof HttpErrorResponse && err.status == 400)
        {
          this.toast.error("Email is already taken");
        }
        else
        {
          this.toast.error(err.status.toString(), err.message);
        }      
        this.isSubmitted = false;
        this.btnRegister.disabled = false;
    });
  }

}
