import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VigilanteGuard {
  constructor(
    private iniciarSesionService: IniciarSesionService,
    private router: Router
  ) {}
  canActivate():boolean{
    if(this.iniciarSesionService.verificarUsuario()){
      return true;
    }
    this.router.navigate(['/land/home'])
    return false;
  }
}
