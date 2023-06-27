import { Ciudad } from './ciudad';
export class MiSesion {
  public codMisesion: string;
  public correoMisesion: string;
  public rolMiSesion: string;
  public ciudadMiSesion: string;
  public nombreMisesion: string;
  public apellidosMisesion: string;

  constructor( cod: string, cor: string, rol: string, ciu: string, nom: string, ape: string ) {
    this.codMisesion = cod;
    this.correoMisesion = cor;
    this.rolMiSesion = rol;
    this.ciudadMiSesion = ciu;
    this.nombreMisesion = nom;
    this.apellidosMisesion = ape;
  }
}
