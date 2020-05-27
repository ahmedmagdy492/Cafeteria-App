import { UsersService } from './../users.service';
import { OrderItem } from './../order-item';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';
import { ProductService } from './../product.service';
import { OrderService } from './../order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-manualorders',
  templateUrl: './manualorders.component.html',
  styleUrls: ['./manualorders.component.css']
})
export class ManualordersComponent implements OnInit {

  products : Product[] = [];
  users : User[];
  isSubmitted : boolean;
  isLoaded : boolean = false;
  cart : any[] = [];  
  totalAmount : number = 0;
  cartForm : FormGroup;

  constructor(
    private orderService : OrderService,
    private prodService : ProductService,
    public auth : AuthService,
    public usersService : UsersService,
    private toast : ToastrService,
    fb : FormBuilder
    ) 
    { 
      this.cartForm = fb.group({
        User: [''],
        Notes: ['']
      })
    }

  ngOnInit(): void {
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
    this.usersService.getAll().subscribe(data => {
      this.users = data as User[];
    });
  }

  //#region clear, addtoCart, find, findIndex, removeFromCart
  clear()
  {
    this.cart.splice(0, this.cart.length);
    this.totalAmount = 0;
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
  //#endregion

  @ViewChild('search')
  inputSearch : HTMLInputElement;
  @ViewChild('btnConfirm')
  btnConfirm : HTMLButtonElement;

  go()
  {    
    this.btnConfirm.disabled = true;
    this.btnConfirm.textContent = "Processing...";
    this.orderService.submitManaulOrder(this.cart as OrderItem[], this.cartForm.value.Notes, this.cartForm.value.User)
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
