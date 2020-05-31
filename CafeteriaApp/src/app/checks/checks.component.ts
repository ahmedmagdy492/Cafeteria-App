import { MatButton } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChecksService } from './../checks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './../users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  allUsers : User[];
  allChecks : any[] = [];
  checksForm : FormGroup;
  isSubmitted : boolean = false;
  @ViewChild('btnSubmit')
  btnSubmit : MatButton;

  constructor(
        private userService : UsersService, 
        private checksService : ChecksService,
        private toast : ToastrService,
        fb : FormBuilder
    ) {

      this.checksForm = fb.group({
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
        User: ['', Validators.required]
      });
    }

  ngOnInit(): void {    
    this.userService.getAll().subscribe(response => {
      this.allUsers = response as User[];      
    });
  }

  getChecks()
  {
    this.isSubmitted = true;
    this.btnSubmit.disabled = true;
    this.checksService.getAll(this.checksForm.value.User, this.checksForm.value.fromDate, this.checksForm.value.toDate).subscribe(data => {
      this.allChecks = data as any[];
      console.log(this.allChecks);
      this.isSubmitted = false;
      this.btnSubmit.disabled = false;
    },
    err => {
      if(err instanceof HttpErrorResponse)
        this.toast.error(err.statusText, "Error");      
      else
        this.toast.error("Internal Server Error", "Error");
      this.isSubmitted = false;
      this.btnSubmit.disabled = false;
    });
  }

}
