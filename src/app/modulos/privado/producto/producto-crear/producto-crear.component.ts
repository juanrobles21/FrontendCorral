import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css'],
})
export class ProductoCrearComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objProducto: Producto;
  public miSuscripcion: Subscription;
  public tmpBase64: any;
  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    public accesoService: ProductoService,
    public toastr: ToastrService
  ) {
    this.objProducto = new Producto('','', '',0,'', '', '');
    this.miSuscripcion = this.tmp;
    this.modalRef = this.tmpBase64;
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }
  public crearProducto(formulario:NgForm):void{
    const nombreProducto:string=this.objProducto.nombreProducto;
    const detalleProducto:string=this.objProducto.detalleProducto;
    const valorProducto:number=this.objProducto.valorProducto;
    const publicoFotoProducto:string=this.objProducto.publicoFotoProducto;
    const privadoFotoProducto:string=this.objProducto.privadoFotoProducto;
    const base64Producto:string=this.objProducto.base64Producto;
    const objNuevoProducto=new Producto('',nombreProducto,detalleProducto,valorProducto,publicoFotoProducto,privadoFotoProducto,base64Producto)

    this.miSuscripcion = this.accesoService
      .registarProducto(objNuevoProducto)
      .pipe(
        map((resultado:any ) => {
          this.router.navigate(['/private/product/manageproduct']);
          mostrarMensaje( 'success', 'Creación correcta de Producto', 'Correcto', this.toastr );
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje( 'error', 'Autenticación incorrecta...Ya existe un producto con ese nombre', 'Error', this.toastr );
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);

  }
  public seleccionarFoto(objeto: any): any {
    let caja = objeto.target.files[0];
    if (!caja || caja.length == 0) {
      return;
    }
    if (caja.type.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(caja);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.objProducto.publicoFotoProducto = caja.name;
      this.objProducto.base64Producto = this.tmpBase64;
    };
  }
}
