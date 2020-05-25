import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../category';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-cate',
  templateUrl: './edit-cate.component.html',
  styleUrls: ['./edit-cate.component.css']
})
export class EditCateComponent implements OnInit {

  id : number;
  name: string;
  editForm : FormGroup;

  constructor(private fb : FormBuilder, private cateService : CategoryService, @Inject(MAT_DIALOG_DATA){Id, Name}, private dialogRef : MatDialogRef<Category>, private toast : ToastrService) 
  { 
    this.id = Id;
    this.name = Name;
    this.editForm = fb.group({
      Name: [this.name, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cancel()
  {
    this.dialogRef.close();
  }

  save()
  {
    this.cateService.edit(this.editForm.value, this.id).subscribe(data => {
      this.cancel();
      this.toast.success("Done", "Updated Successfully");
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
