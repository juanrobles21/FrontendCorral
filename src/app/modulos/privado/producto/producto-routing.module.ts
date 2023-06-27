import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';
import { ProductoSearchOneComponent } from './producto-search-one/producto-search-one.component';
import { ProductoEditarFotoComponent } from './producto-editar-foto/producto-editar-foto.component';

const routes:Routes=[
  { path: 'manageproduct', component: ProductoAdminComponent },
  { path: 'addproduct', component: ProductoCrearComponent },
  { path: 'editproduct/:codProducto', component: ProductoEditarComponent },
  { path: 'editproductphoto/:codProducto', component: ProductoEditarFotoComponent },
  { path: 'searchoneproduct/:codProducto', component: ProductoSearchOneComponent },
  { path: '', redirectTo: 'manageproduct', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forChild(routes) ]
})
export class ProductoRoutingModule { }
