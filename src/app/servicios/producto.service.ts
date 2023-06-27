import { API_PRODUCTO } from './../utilidades/dominios/uris';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';

import * as miUrl from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public apiProduct: string = miUrl.API_PRODUCTO;
  public apiProductRegister: string = miUrl.API_PRODUCTO + '/add';
  public apiProductOne: string = miUrl.API_PRODUCTO + '/one/';
  public apiProductUpdate: string = miUrl.API_PRODUCTO + '/updateinfo';
  public apiProductPhotoUpdate: string = miUrl.API_PRODUCTO + '/updatephoto';
  public apiProductDelete: string = miUrl.API_PRODUCTO + '/delete/';

  constructor(private http: HttpClient) {}

  public obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiProduct + '/all');
  }
  public registarProducto(objAcceso: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiProductRegister, objAcceso);
  }
  public obtenerUnProducto(codProducto: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiProductOne}${codProducto}`);
  }
  public updateProducto(product: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.apiProductUpdate, product );
  }
  public updateProductoPhoto(product: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.apiProductPhotoUpdate, product );
  }
  public eliminarProducto(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiProductDelete}${codigo}`);
  }
}
