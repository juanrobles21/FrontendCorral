import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map, catchError } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/modelos/rol';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
import { RolService } from 'src/app/servicios/rol.service';
import { RespuestaInicioSesion } from 'src/app/modelos/respuesta-inicio-sesion';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-crear',
  templateUrl: './rol-crear.component.html',
  styleUrls: ['./rol-crear.component.css']
})
export class RolCrearComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objRole:Rol;
  public miSuscripcion: Subscription;

  constructor(
    private router: Router,
    public accesoService: RolService,
    public toastr: ToastrService
  ){
    this.objRole=new Rol('',0);
    this.miSuscripcion=this.tmp;
  }
  ngOnInit(): void {
      
  }
  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
      
  }
  public registro(formulario:NgForm):void{
    const nombreRol:string=this.objRole.nombreRol;
    const estadoRol:number=this.objRole.estadoRol;
    const objNuevoRol=new Rol(nombreRol,estadoRol);

    this.miSuscripcion = this.accesoService
      .registarRol(objNuevoRol)
      .pipe(
        map((resultado:any ) => {
          this.router.navigate(['/private/role/managerole']);
          mostrarMensaje( 'success', 'Creación correcta de Rol', 'Correcto', this.toastr );
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje( 'error', 'Autenticación incorrecta', 'Error', this.toastr );
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
