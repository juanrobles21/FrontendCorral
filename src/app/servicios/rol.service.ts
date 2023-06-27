import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Rol } from '../modelos/rol';
import { HttpClient } from '@angular/common/http';
import * as miUrl from '../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public apiRol: string = miUrl.API_ROL;
  public apiRolRegister: string = miUrl.API_ROL + '/add';

  constructor(private http: HttpClient) {}

  public obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiRol + '/all');
  }

  public registarRol(objAcceso: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiRolRegister, objAcceso);
  }
}
