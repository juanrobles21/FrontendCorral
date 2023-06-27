import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css'],
})
export class ProductoEditarComponent implements OnInit {
  public tmp: any;
  public cargaFinalizada: boolean;
  public subscription: Subscription;
  public codigito: string;
  public productData: Producto;
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
    this.modalRef = this.tmpBase64;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codigito = String(params.get('codProducto'));
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

  public updateProducto(formulario: NgForm): void {
    const codProducto: string = this.codigito;
    const nombreProducto: string = this.productData.nombreProducto;
    const detalleProducto: string = this.productData.detalleProducto;
    const valorProducto: number = this.productData.valorProducto;
    const objNuevoProducto = new Producto(
      codProducto,
      nombreProducto,
      detalleProducto,
      valorProducto,
      '',
      '',
      ''
    );

    this.subscription = this.productService
      .updateProducto(objNuevoProducto)
      .pipe(
        map((resultado: any) => {
          this.router.navigate([
            '/private/product/searchoneproduct/',
            this.codigito,
          ]);
          mostrarMensaje(
            'success',
            'Correcta de Producto',
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
}
