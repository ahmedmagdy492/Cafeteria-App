import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from './../category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../product';
import { Category } from '../category';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  editProduct : FormGroup;
  categories : Category[];
  id : number;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  oldImage;
  isAvail : boolean;

  constructor(
    private prodService : ProductService,
    fb : FormBuilder,
    private toast : ToastrService,
    @Inject(MAT_DIALOG_DATA){Id, Name, Price, CategoryId, ImgUrl, IsAvialable},
    private dialogRef : MatDialogRef<Product>,
    private cateService : CategoryService) 
  { 
      this.id = Id;
      this.oldImage = ImgUrl;
      this.cateService.getAll().subscribe(data => {
        this.categories = data as Category[];
      });
      
      this.editProduct = fb.group({
        Name: [Name, Validators.required],
        Price: [Price, Validators.required],
        CategoryId: [CategoryId, Validators.required],
        ImgUrl: [ImgUrl],
        IsAvialable: [IsAvialable]
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
    var img : string = this.croppedImage;
    this.editProduct.value.ImgUrl = img.substring(22) || this.oldImage;
    this.editProduct
    this.prodService.edit(this.id, this.editProduct.value).subscribe(data => {
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
