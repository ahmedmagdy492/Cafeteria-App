import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProdForm : FormGroup;
  categories : Category[];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isSubmitted : boolean;
  @ViewChild('btnSave')
  btnSave : MatButton;

  constructor(private prdService : ProductService, fb : FormBuilder, private cateService : CategoryService, private router : Router) { 

    this.cateService.getAll().subscribe(data => {
      this.categories = data as Category[];
    });
    
    this.addProdForm = fb.group({
      Name: ['', Validators.required],
      ImgUrl: [''],
      Price: [0, Validators.required],      
      CategoryId: [0, Validators.required]
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

  onSubmit()
  {
    this.isSubmitted = true;
    this.btnSave.disabled = true;
    var img : string = this.croppedImage;
    this.addProdForm.value.ImgUrl = img.substring(22);
    this.prdService.addProduct(this.addProdForm.value).subscribe(data => {
      this.isSubmitted = false;
      this.btnSave.disabled = false;
      this.router.navigate(['/products']);
    },
    err => {
      this.isSubmitted = false;
      this.btnSave.disabled = false;      
    })
  }

}
