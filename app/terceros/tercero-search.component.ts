import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TerceroSearchService } from './tercero-search.service';
import { Tercero } from '../terceros/tercero';

@Component({
  moduleId: module.id,
  selector: 'tercero-search',
  templateUrl: 'tercero-search.component.html',
  styleUrls: [ 'tercero-search.component.css' ],
  providers: [ TerceroSearchService ]
})
export class TerceroSearchComponent implements OnInit {

  terceros: Observable<Tercero[]>;
  private searchTerms = new Subject<string>();          // <--- Terminos de busqueda
  
  constructor(
    private terceroSearchService: TerceroSearchService,
    private router: Router
  ) {}
  
  // Push a search term into the observable stream.
  search( term: string ): void {
    this.searchTerms.next( term );
  }

  ngOnInit(): void {
    this.terceros = this.searchTerms
      .debounceTime(300)        // Espera de 300ms (frecuencia de peticiones)
      .distinctUntilChanged()   // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
      .switchMap(term => term   // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
        // Retorna la búsqueda http observables
        ? this.terceroSearchService.search(term)
        // o lo observable del herpes vacías si no hay término de búsqueda
        : Observable.of<Tercero[]>([]))
      .catch(error => {
        // HACER: control de errores reales
        console.log(error);
        return Observable.of<Tercero[]>([]);
      });
  }

  gotoDetail(obj: Tercero): void {
    let link = ['/terceros/detalle', obj.id];
    this.router.navigate(link);
  }
}