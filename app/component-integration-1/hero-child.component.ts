import { Component, Input,  OnInit, OnDestroy } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TerceroSearchService } from '../terceros/tercero-search.service';
import { Tercero } from '../terceros/tercero';
import { Hero } from './hero';

@Component({
  selector: 'hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
    <hr />
    <div class="mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--2-col-phone">
        <label>Tercero</label>
        <input #searchBox id="search-box" (keyup)="search(searchBox.value)" [value]="razon_social" />
        <span>{{ obj.codigo + ' ' + obj.nombre1 + ' ' + obj.nombre2 + ' ' + obj.apellido1 + ' ' + obj.apellido2  }}</span>
        <div>
            <div *ngFor="let tercero of terceros | async"
                (click)="showDetail(tercero)" class="search-result" >
            {{tercero.razon_social}}
            </div>
        </div>
    </div>
  `
})
export class HeroChildComponent {
    @Input() hero: Hero;
    @Input('master') masterName: string;
    obj = new Tercero();
    @Input() tercero: Tercero;

    private terceros: Observable<Tercero[]>;
    private terminos_de_busqueda = new Subject<string>();      
    private razon_social: string = '';


    constructor(
        private terceroSearchService: TerceroSearchService
    ) {

    }

    ngOnInit() {
        this.terceros = this.terminos_de_busqueda
            .debounceTime( 300 )              // Espera de 300ms (frecuencia de peticiones)
            .distinctUntilChanged()           // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
            .switchMap( term => term          // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
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

    ngOnDestroy() {

    }

    search( term: string ): void {
        this.terminos_de_busqueda.next( term );
    }

    showDetail(obj: Tercero): void {
        if ( obj .razon_social != '' ) {
        this .obj = obj;
        this .tercero = this .obj;
        this .razon_social = obj .razon_social;
        }  
    }

}