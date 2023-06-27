import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { RolService } from 'src/app/servicios/rol.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-admin',
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.css']
})
export class RolAdminComponent implements OnInit,OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arrgloRoles:Rol[];
  public subscription: Subscription;

  constructor(private rolService:RolService){
    this.arrgloRoles=[];
    this.subscription=this.tmp;
    this.cargaFinalizada=false;
  }
  ngOnInit(): void {
    this.obtenerRoles();  
  }
  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }
  public obtenerRoles(): void {
    this.subscription = this.rolService
      .obtenerRoles()
      .pipe(
        map((respuesta: any) => {
          this.arrgloRoles = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

}
