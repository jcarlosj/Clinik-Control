import { Component, forwardRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

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

    @Input() obj = new Object();
    terceros: Observable<Object[]>;
    private searchTerms = new Subject<string>();          // <--- Terminos de busqueda
    private razon_social: string = '';
    private inputFocused = new EventEmitter();

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //The internal data model
    private innerValue: any = '';
    private objSelected: Object;

    search( term: string ): void {
        this.searchTerms.next( term );
    }

    @Input() tabla:string;
    @Input() campo:string;
    @Input() etiqueta:string;
    @Input() urlApi:string;

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

  constructor( private autocompleteService: AutoCompleteService ) { 
    console .log( 'constructor()' );
  }

  ngOnInit() {
    console .log( 
        '> RECIBE\n ngOnInit() \n [ \n' +
        ' - this.api + this.tabla  : ' + this .urlApi + this .tabla + '\n' +
        ' - this.campo             : ' + this .campo + '\n' +
        ' - this.etiqueta          : ' + this .etiqueta + '\n ] \n' 
    );

    this.terceros = this.searchTerms
      .debounceTime(300)        // Espera de 300ms (frecuencia de peticiones)
      .distinctUntilChanged()   // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
      .switchMap(term => term   // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
        // Retorna la búsqueda http observables
        ? this.autocompleteService.search( 
            this.urlApi, 
            this.tabla, 
            this.campo, 
            term 
        )
        // o lo observable del herpes vacías si no hay término de búsqueda
        : Observable.of<Object[]>([]))
      .catch(error => {
        // HACER: control de errores reales
        console.log(error);
        return Observable.of<Object[]>([]);
      });

  }
  ngOnDestroy() {
      console .log( 'ngOnDestroy()' );
  }

      //Set touched on blur
    onBlur(obj:Object) {
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


    showDetail(obj:Object, search: any): void {

        if ( obj[ this.campo ] != '' ) {
            this .obj = obj;
        }

        // (To debug)
        console.log( 
            'showDetail() \n [ \n' +
            ' - Object.keys( this .obj ) \n ' + Object .keys( this.obj ) + '\n\n' +
            ' - Object.values( this .obj ) \n ' + Object .values( this.obj ) + '\n ] \n'
        );

        search.value = null;        // Limpia el campo de búsqueda en el formulario

        this .objSelected = obj;    
        this.blur.emit( obj );      // ENVIA el Objeto al PARENT

    }
}


/* ---
    Herencia: Creamos dos clases para evitar el conficto que nos genera  
    llamar la misma clase (ó Componente) en dos lugares donde es requerida 
   ---  */
export class AutoCompleteComponentByComponent extends AutocompleteComponent {}
export class AutoCompleteComponentByModule extends AutocompleteComponent {}