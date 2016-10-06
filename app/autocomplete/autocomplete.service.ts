import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

//import { Tercero }        from '../terceros/tercero';

@Injectable()

export class AutoCompleteService {

  constructor( private http: Http ) {}

  //search(term: string): Observable<Tercero[]> {
  /* ---------
    - termino de busqueda
    - URL API
    - Estructura del Objeto
  */    
  //search(termino: string): Observable<Tercero[]> {
  search( urlApi: string, tabla:string, termino_busqueda: string ): Observable<Object[]> {        

    console.log( 
      'Configuración de búsqueda \n ---------------------------- \n' + 
      ' - urlApi  : ' + urlApi + '\n' +
      ' - tabla   : ' + tabla + '\n' +          // <--- El nombre esta asociado a la última cadena de la urlAPI
      ' - termino : ' + termino_busqueda + '\n' +
      ' - url     : ' + `${urlApi}/?${tabla}=${termino_busqueda}`          
    );

    return this.http
               //.get(`app/terceros/?razon_social=${termino}`)
               .get(`${urlApi}/?${tabla}=${termino_busqueda}`)
               //.map( (r: Response) => r.json().data as Tercero[] );
               .map( (r: Response) => r.json().data as Object[] );
  }
}