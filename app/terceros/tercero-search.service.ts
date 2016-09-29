import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { Tercero }        from '../terceros/tercero';

@Injectable()

export class TerceroSearchService {

  constructor( private http: Http ) {}

  search(term: string): Observable<Tercero[]> {

    return this.http
               .get(`app/terceros/?razon_social=${term}`)
               .map( (r: Response) => r.json().data as Tercero[] );
  }
}