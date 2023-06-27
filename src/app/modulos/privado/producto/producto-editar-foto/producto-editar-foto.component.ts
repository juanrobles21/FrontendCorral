import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-editar-foto',
  templateUrl: './producto-editar-foto.component.html',
  styleUrls: ['./producto-editar-foto.component.css']
})
export class ProductoEditarFotoComponent implements OnInit {
  public tmp: any;
  public cargaFinalizada: boolean;
  public subscription: Subscription;
  public codigito: string;
  public productData: Producto;
  public producDataImg: Producto;
  public tmpBase64: any;
  public modalRef: BsModalRef;

  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
    this.codigito = '';
    this.productData = new Producto('', '', '', 0, '', '', '');
    this.producDataImg = new Producto('', '', '', 0, '', '', '');
    this.modalRef = this.tmpBase64;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codigito = String(params.get('codProducto'));
      this.obtenerProducto(this.codigito);
      if (this.codigito) {
        this.productService.obtenerUnProducto(this.codigito).subscribe(
          (res) => {
            this.productData = res;
            console.log(this.productData);
          },
          (err) => console.log(err)
        );
      }
    });
  }
  public obtenerProducto(codProducto: string) {
    this.subscription = this.productService
      .obtenerUnProducto(codProducto)
      .pipe(
        map((respuesta: any) => {
          this.producDataImg = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public updateProducto(formulario: NgForm): void {
    const codProducto: string = this.codigito;
    const publicoFotoProducto:string=this.productData.publicoFotoProducto;
    const privadoFotoProducto:string=this.productData.privadoFotoProducto;
    const base64Producto:string=this.productData.base64Producto;
    const objNuevoProducto = new Producto(
      codProducto,
      this.productData.nombreProducto,
      this.productData.detalleProducto,
      this.productData.valorProducto,
      publicoFotoProducto,
      privadoFotoProducto,
      base64Producto
    );

    this.subscription = this.productService
      .updateProductoPhoto(objNuevoProducto)
      .pipe(
        map((resultado: any) => {
          this.router.navigate([
            '/private/product/searchoneproduct/',
            this.codigito,
          ]);
          mostrarMensaje(
            'success',
            'Correcta foto de Producto',
            'Actulaización',
            this.toastr
          );
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Autenticación incorrecta',
            'Error',
            this.toastr
          );
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
      this.productData.publicoFotoProducto = caja.name;
      this.productData.base64Producto = this.tmpBase64;
    };
  }
}
