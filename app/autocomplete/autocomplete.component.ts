import { Component, forwardRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Path } from '../Paths';
import { Tercero } from '../terceros/tercero';
import { AutoCompleteService } from '../autocomplete/autocomplete.service';



const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};
/***/

@Component({
  moduleId: module.id,
  selector: 'autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: [ 'autocomplete.component.css' ],
  providers: [ AutoCompleteService ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy  {


    private desarrollador: Object[] = [{ nombre: 'Samir', profesion: 'peligro', edad: 34 }];

    @Input() obj = new Tercero();
    terceros: Observable<Tercero[]>;
    private searchTerms = new Subject<string>();          // <--- Terminos de busqueda
    private razon_social: string = '';
    private inputFocused = new EventEmitter();

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //The internal data model
    private innerValue: any = '';
    private objSelected: Tercero;

    search( term: string ): void {
        this.searchTerms.next( term );
    }

    @Input() tabla:string;

    //get accessor
    @Input() 
    get value(): any {
        return this.innerValue;
    };
    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();

  private api:string = Path.Server.API;

  constructor( private autocompleteService: AutoCompleteService ) { 
    console .log( '-> CHILD (AutocompleteComponent) api: ' + this.api );
  }

  ngOnInit() {
    console .log( 'URL API: ' + this.api+this.tabla );

    this.terceros = this.searchTerms
      .debounceTime(300)        // Espera de 300ms (frecuencia de peticiones)
      .distinctUntilChanged()   // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
      .switchMap(term => term   // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
        // Retorna la búsqueda http observables
        ? this.autocompleteService.search(term)
        // o lo observable del herpes vacías si no hay término de búsqueda
        : Observable.of<Tercero[]>([]))
      .catch(error => {
        // HACER: control de errores reales
        console.log(error);
        return Observable.of<Tercero[]>([]);
      });

  }
  ngOnDestroy() {}

      //Set touched on blur
    onBlur(obj:Tercero) {
        console .log( '--> CHILD: AutocompleteComponent -> onBlur(): ' );
        console .log( '--> obj: ' + Object.values( obj ) );
        this.onTouchedCallback();        
        this.blur.emit( obj );
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
        this.change.emit(null);
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


  showDetail(obj:Tercero): void {
    
    
    this .objSelected = obj;
    console.log( '--> CHILD: AutocompleteComponent -> showDetail(): obj: " \n' + Object .values( this.obj ) );
    //this.onTouchedCallback();
    this.blur.emit( obj );
    if ( obj .razon_social != '' ) {
      this .obj = obj;
      this .razon_social = obj .razon_social;
    }
  
  }
}