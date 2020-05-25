import { OrderService } from './../order.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './../auth.service';
import { UpdateproductComponent } from './../updateproduct/updateproduct.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Product } from '../product';
import { DomSanitizer } from '@angular/platform-browser'
import { DelProductComponent } from '../del-product/del-product.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderItem } from '../order-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {  

  products : Product[] = [];
  isSubmitted : boolean;
  isLoaded : boolean = false;
  cart : any[] = [];  
  totalAmount : number = 0;
  cartForm : FormGroup;

  constructor(
    private prodService : ProductService, 
    public auth : AuthService,
    private router : Router, 
    private dialog : MatDialog,
    public dom : DomSanitizer,
    private toast : ToastrService,
    private orderService : OrderService,
    fb : FormBuilder) 
    {  
      this.cartForm = fb.group({
        Notes: ['']
      })
    }

  ngOnInit(): void 
  {
    this.isLoaded = true;
    this.prodService.getAll()
                    .subscribe(data => {      
                      this.products = data as Product[];            
                      this.isLoaded = false;
                    },
                    (err) => {
                      if(err  instanceof HttpErrorResponse) 
                        this.toast.error(err.status.toString(), err.message);      
                      else      
                        this.toast.error(err.status.toString(), err.message);      
                    });
  }

  del(prod : Product)
  {
    this.dialog.open(DelProductComponent, {
      data: {
        Id: prod.Id,
        Name: prod.Name
      }
    });
  }

  edit(prod : Product)
  {
    this.dialog.open(UpdateproductComponent, {
      data: {
        Id: prod.Id,
        Name: prod.Name,
        Price: prod.Price,
        CategoryId: prod.CategoryId,
        ImgUrl: prod.ImgUrl
      }
    });
  }

  avail(event, prod : Product)
  {
    this.isSubmitted = true;
    event.target.disabled = true;
    this.prodService.availOrUn(prod.Id).subscribe(data => {
      this.isSubmitted = false;
      event.target.disabled = false;
      event.target.innerHTML = (data as Product).IsAvailable == true ? "Avail" : "UnAvail";
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
    })
  }
  
  goto()
  {
    this.router.navigate(['/add-product']);
  }

  clear()
  {
    this.cart.splice(0, this.cart.length);
    this.totalAmount = 0;
  }

  find(item : any)
  {
    let found;
    for(let i = 0; i < this.cart.length; i++)
    {
      if(this.cart[i].product.Id == item.product.Id)
      {
        found = this.cart[i];
      }
    }
    return found || null;
  }

  findIndex(item : any)
  {
    let index;
    for(let i = 0; i < this.cart.length; i++)
    {
      if(this.cart[i].product.Id == item.product.Id)
      {
        index = i;
      }
    }
    return index;
  }
  
  addToCart(prod : any)
  {
    var resultObject = this.find(prod);
    this.totalAmount += prod.product.Price;    
    if(resultObject == null)
      this.cart.push(prod);
    else
    {
      let index = this.cart.indexOf(resultObject);
      resultObject.quantity += 1;
      this.cart.splice(index, 1, resultObject);
    }
  }

  removeFromCart(prod : any)
  {    
    let eleIndex = this.findIndex(prod);
    let ele = this.find(prod);
    if(eleIndex != undefined)
    {
      if(ele.quantity == 1)
      {
        this.cart.splice(eleIndex, 1);
        this.totalAmount -= prod.product.Price;
      }
      else if(ele.quantity > 1)
      {        
        ele.quantity -= 1;
        this.cart.splice(eleIndex, 1, ele);
        this.totalAmount -= prod.product.Price;
      }      
    }

  }

  @ViewChild('search')
  inputSearch : HTMLInputElement;
  @ViewChild('btnConfirm')
  btnConfirm : HTMLButtonElement;

  go()
  {    
    this.btnConfirm.disabled = true;
    this.btnConfirm.textContent = "Processing...";
    this.orderService.submitOrder(this.cart as OrderItem[], this.cartForm.value.Notes)
    .subscribe(data => {
      this.toast.success(data as string, "Done");
      this.btnConfirm.disabled = false;
      this.btnConfirm.textContent = "Confirm";
      this.cart = [];
      this.cartForm.value.Notes = "";
    },
    err => {
      if(err instanceof HttpErrorResponse)
      {
        this.toast.error(err.message);
      }
      else
      {
        this.toast.error(err);
      }
      this.btnConfirm.disabled = false;
      this.btnConfirm.textContent = "Confirm";
      this.cartForm.value.Notes = "";
    });
  }

}
