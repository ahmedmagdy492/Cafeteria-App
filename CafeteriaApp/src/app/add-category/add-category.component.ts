import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth.service';
import { CategoryService } from './../category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCateForm : FormGroup;
  isSubmitted : boolean;
  @ViewChild('btnSubmit')
  btnSubmit : MatButton

  constructor(
    private cateService : CategoryService,
    private fb : FormBuilder,
    private router : Router,
    private auth : AuthService,
    private toast : ToastrService
    ) 
  { 
    this.addCateForm = fb.group({
      Name: ['', Validators.required]
    });
  }

  ngOnInit(): void {    
  }

  onSubmit()
  {
    this.btnSubmit.disabled = true;
    this.isSubmitted = true;
    this.cateService.add(this.addCateForm.value).subscribe(data => {
      this.isSubmitted = false;
      this.btnSubmit.disabled = false;
      this.router.navigate(['categories']);
    },
    err => {
      if(err  instanceof HttpErrorResponse)
      {
        this.toast.error(err.status.toString(), err.message);
      }
      else
      {
        this.toast.error(err.status.toString(), err.message);
      }
    });
  }

}
