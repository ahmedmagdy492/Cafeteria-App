import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../category.service';
import { Component, OnInit, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-cate',
  templateUrl: './delete-cate.component.html',
  styleUrls: ['./delete-cate.component.css']
})
export class DeleteCateComponent implements OnInit {

  id : number;
  name : string;

  constructor(
    private cateService : CategoryService,
    private dialogRef : MatDialogRef<Category>,
    @Inject(MAT_DIALOG_DATA){Id, Name},
    private router : Router,
    private toast : ToastrService    
  ) 
  { 
    this.id = Id;
    this.name = Name;
  }

  ngOnInit(): void {
  }

  cancel()
  {
    this.dialogRef.close();
  }

  confirm()
  {
    this.cateService.del(this.id).subscribe(data => {
      this.cancel();
      this.toast.success("Done", "Deleted Successfully");
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
