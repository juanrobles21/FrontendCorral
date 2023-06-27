import { Component } from '@angular/core';
import { MiSesion } from 'src/app/modelos/mi-sesion';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';

@Component({
  selector: 'app-cabecera-dash',
  templateUrl: './cabecera-dash.component.html',
  styleUrls: ['./cabecera-dash.component.css']
})
export class CabeceraDashComponent {
  public objMiSesion:MiSesion;
  constructor(public sesioncita:IniciarSesionService){
    this.objMiSesion=sesioncita.obtenerDatosSesion();
  }

}
