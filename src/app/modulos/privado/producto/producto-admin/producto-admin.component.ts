import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';

@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.css'],
})
export class ProductoAdminComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arrgloProductos: Producto[];
  public productoSeleccionado:Producto;
  public subscription: Subscription;
  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalCuerpo: string;
  public modalContenido: string;
  public tmpBase64: any;

  constructor(private productService: ProductoService,public miModal: BsModalService,public toastr: ToastrService) {
    this.arrgloProductos = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
    this.productoSeleccionado=this.inicializarProducto();
    this.tmpBase64 = null;
    this.modalRef = this.tmpBase64;
    this.modalTitulo = '';
    this.modalCuerpo = '';
    this.modalContenido = '';
  }
  ngOnInit(): void {
    this.obtenerProductos();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public inicializarProducto():Producto{
    return new Producto('','','',0,'','','');
  }
  public obtenerProductos(): void {
    this.subscription = this.productService
      .obtenerProductos()
      .pipe(
        map((respuesta: any) => {
          this.arrgloProductos = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
  public eliminarProductos(codigo: string) {
    this.productService.eliminarProducto(codigo).subscribe(() => {
      this.arrgloProductos = this.arrgloProductos.filter(
        (p) => p.codProducto !== codigo

      );
      mostrarMensaje( 'success', 'Eliminado con exito el producto', 'Correcto', this.toastr );
    });
  }
   // Gestión de la ventana flotante
  // ***********************************************************************
  public abrirModal(plantilla: TemplateRef<any>, objProducto: Producto): void {
    this.productoSeleccionado = objProducto;
    this.modalRef = this.miModal.show(plantilla, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = '¿Realmente quiere eliminar el producto?';
    this.modalContenido = objProducto.nombreProducto;
  }
  public btnCancelar(): void {
    this.modalRef.hide();
  }
  public btnEliminar(): void {
    this.eliminarProductos(this.productoSeleccionado.codProducto);
    this.btnCancelar();
  }
}

