import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component'
import { HeaderComponent } from './header/header.component';


// angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { DeleteCateComponent } from './delete-cate/delete-cate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EditCateComponent } from './edit-cate/edit-cate.component';
import { AddProductComponent } from './add-product/add-product.component'; 
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';
import { DelProductComponent } from './del-product/del-product.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { MatTreeModule } from '@angular/material/tree';
import { MyordersComponent } from './myorders/myorders.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ManualordersComponent } from './manualorders/manualorders.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddCategoryComponent,
    HeaderComponent,
    DeleteCateComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditCateComponent,
    AddProductComponent,
    ProductsComponent,
    DelProductComponent,
    UpdateproductComponent,
    SidebarComponent,
    MyordersComponent,
    AllordersComponent,
    ManualordersComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ImageCropperModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: 'categories', component: CategoryComponent, canActivate: [AuthGuard]},
      {path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard]},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
      {path: 'products', component: ProductsComponent},
      {path: 'myorders', component: MyordersComponent},
      {path: 'orders', component: AllordersComponent},
      {path: 'manualorders', component: ManualordersComponent},
      {path: '**', component: HomeComponent}
    ]),
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
    MatProgressBarModule, MatTableModule, MatDialogModule,
    MatProgressSpinnerModule, MatSidenavModule, MatTreeModule,
    
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
