import { Component } from '@angular/core';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styleUrls: ['./menu-dash.component.css']
})
export class MenuDashComponent {
  constructor(public sesioncita:IniciarSesionService){}
}
