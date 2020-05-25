import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MyOrder } from './../my-order';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../order.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  allOrders : MyOrder[];
  orderFinshed : boolean = false;  
  isSubmitted = false;
  isLoaded = false;
  formFilter : FormGroup;

  constructor(
    private ordersService : OrderService, 
    private toast : ToastrService,
    fb : FormBuilder
    ) 
    { 
      this.formFilter = fb.group({
        filter: ['']
      });
    }

  ngOnInit(): void {
    this.getAll();
  }

  @ViewChild('btnFilter')
  btnFilter : MatButton;

  apply()
  {
    this.isSubmitted = true;
    this.btnFilter.disabled = true;
    this.ordersService.applyFilter(this.formFilter.value).subscribe(data => {
      this.allOrders = data as MyOrder[];
      this.isSubmitted = false;
      this.btnFilter.disabled = false;
    },
    err => {
      this.toast.error("Error", err);
      this.isSubmitted = false;
      this.btnFilter.disabled = false;
    });
  }

  getAll()
  {
    this.ordersService.getAllOrders().subscribe((data) => {
      this.allOrders = data as MyOrder[];
      this.isLoaded = true;
    },
    err => {
      if(err instanceof HttpErrorResponse)
      {
        this.toast.error("Error", err.message);
      }
      else
      {
        this.toast.error("Error", err);
      }
      this.isLoaded = true;
    });
  }

  @ViewChild('btnFinish')
  btnFinish : MatButton;

  done(id : number)
  {    
    this.btnFinish.disabled = true;
    this.isSubmitted = true;
    this.ordersService.finishOrder(id).subscribe(data => {      
      this.orderFinshed = true;
      this.toast.success("Status Changed Successfully", "Done");      
      this.isSubmitted = false;
      this.btnFinish.disabled = false;
    },
    err => {
      if(err instanceof HttpErrorResponse)
      {
        this.toast.error("Error", err.message);
      }
      this.isSubmitted = false;
      this.btnFinish.disabled = false;
    });
  }

}
