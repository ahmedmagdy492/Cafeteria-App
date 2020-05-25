import { ToastrService } from 'ngx-toastr';
import { EditCateComponent } from './../edit-cate/edit-cate.component';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../category';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCateComponent } from '../delete-cate/delete-cate.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataSource : MatTableDataSource<Category>;
  displayedColumns = ["Name", "Actions"];
  isLoaded = false;

  constructor(private cateService : CategoryService, private delDialog: MatDialog,
    private router : Router, private auth : AuthService, private toast : ToastrService) { }

  ngOnInit(): void {
    this.isLoaded = true;
      this.cateService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource<Category>(data as Category[]);
        this.isLoaded = false;
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

  del(id)
  {
    this.delDialog.open(DeleteCateComponent, {
      data: {
        Id: id
      }
    })
  }

  goto()
  {
    this.router.navigate(['add-category']);
  }

  edit(category)
  {
    this.delDialog.open(EditCateComponent, {
      data: {
        Id: category.Id,
        Name: category.Name
      }
    })
  }

}
