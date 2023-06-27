import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
@Component({
  selector: 'app-producto-search-one',
  templateUrl: './producto-search-one.component.html',
  styleUrls: ['./producto-search-one.component.css'],
})
export class ProductoSearchOneComponent implements OnInit {
  public tmp: any;
  public cargaFinalizada: boolean;
  public subscription: Subscription;
  public codigito: string;
  public product: Producto;
  constructor( private productService: ProductoService, private route: ActivatedRoute ) {
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
    this.codigito = '';
    this.product = new Producto('','', '', 0, '', '', '');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codigito = String(params.get('codProducto'));
      this.obtenerProducto(this.codigito);
    });
  }

  public obtenerProducto(codProducto: string) {
    this.subscription = this.productService
      .obtenerUnProducto(codProducto)
      .pipe(
        map((respuesta: any) => {
          this.product = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
