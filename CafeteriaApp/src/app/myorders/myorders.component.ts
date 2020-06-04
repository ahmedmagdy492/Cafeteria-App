import { MyOrder } from './../my-order';
import { OrderProduct } from './../order-product';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  
  orders : MyOrder[];
  filterForm : FormGroup;

  constructor(private orderService : OrderService, 
              private toast : ToastrService,
              fb : FormBuilder) 
  {
    this.filterForm = fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAll();
  }  

  getAll()
  {
    this.orderService.getMyOrders().subscribe((res : MyOrder[])=> {
      this.orders = res;
      console.log(this.orders);
    },
    err => {
      if(err instanceof HttpErrorResponse)
      {
        this.toast.error(err.status.toString(), err.message);
      }
      else
      {
        this.toast.error("Error", err.status.toString());
      }
    });
  }

  filter()
  {
    this.orderService.filterWithDate(this.filterForm.value.fromDate, this.filterForm.value.toDate).subscribe(data => {
      this.orders = data as MyOrder[];
    },
    err => {
      if(err instanceof HttpErrorResponse)
        this.toast.error(err.statusText, "Error");
      else
        this.toast.error(err.message, "Error");
    });
  }
}
