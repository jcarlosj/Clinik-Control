import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { Producto }        from '../productos/producto';

@Injectable()

export class ProductoSearchService {

  constructor( private http: Http ) {}

  search(term: string): Observable<Producto[]> {

    return this.http
               .get(`app/productos/?descripcion1=${term}`)
               .map( (r: Response) => r.json().data as Producto[] );
  }
}