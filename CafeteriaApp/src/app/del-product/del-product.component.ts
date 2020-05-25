import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-del-product',
  templateUrl: './del-product.component.html',
  styleUrls: ['./del-product.component.css']
})
export class DelProductComponent implements OnInit {

  id : number;
  name : string;

  constructor(
    private prodService : ProductService,
    private dailog : MatDialogRef<Product>,
    @Inject(MAT_DIALOG_DATA){Id, Name},
    private toast : ToastrService
    ) { 
      this.id = Id;
      this.name = Name;
    }

  ngOnInit(): void {
  }

  cancel()
  {
    this.dailog.close();
  }

  del()
  {
    this.prodService.del(this.id).subscribe(data => {
      this.cancel();
      this.toast.success("Done", "Deleted Successfully");
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
