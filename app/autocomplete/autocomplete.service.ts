import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { Tercero }        from '../terceros/tercero';

@Injectable()

export class AutoCompleteService {

  constructor( private http: Http ) {}

  //search(term: string): Observable<Tercero[]> {
  /* ---------
    - termino de busqueda
    - URL API
    - Estructura del Objeto
  */    
  search(termino: string): Observable<Tercero[]> {
  //search(urlApi: string, tabla:string, termino_busqueda: string ): Observable<Object[]> {        

    return this.http
               .get(`app/terceros/?razon_social=${termino}`)
               //.get(`${urlApi}/?${tabla}=${termino_busqueda}`)
               .map( (r: Response) => r.json().data as Tercero[] );
               //.map( (r: Response) => r.json().data as Object[] );
  }
}