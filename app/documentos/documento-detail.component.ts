// Imports del core de Angular 2 necesarios para este componente
import { Component,
         EventEmitter,
         Input,
         OnInit,
         OnDestroy,
         Output }              from '@angular/core';
import { Router,
         ActivatedRoute }      from '@angular/router';
import { FormControl,
         FormGroup,
         Validators }          from '@angular/forms';

import {ReactiveFormsModule}   from '@angular/forms';
import { Location }            from '@angular/common';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Imports personalizados necesarios para este componente
import { Path, Validate }      from '../paths';
import { DocumentoService } from './documento.service';
import { Documento }        from './documento';
import { Tercero }          from '../terceros/tercero';  
import { TerceroSearchService } from '../terceros/tercero-search.service';
import { DataService }     from '../data.service';
import { cTipoTabla }          from '../_tipos/c-tipo-tabla';
import { cEstado }             from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'documentos-detail',
  templateUrl : 'documento-detail.component.html',
  providers: [ TerceroSearchService ]
})

// Class
export class DocumentoDetail implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private frmDocumento    : FormGroup;
  private vObj            : Documento;
  tercero = new Tercero();
  private codigo          : string;
  //private tiposTablas     : cTipoTabla[];
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  private path            : string;

  // Definimos texto boton y titulo
  private title         = '';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';

  private data      : any[];
  private conceptos : any;
  private origenes  : any;
  private destinos  : any;

  // BUSQUEDA
  obj = new Tercero();
  terceros: Observable<Tercero[]>;
  private searchTerms = new Subject<string>();          // <--- Terminos de busqueda
  private razon_social: string = '';
  private inputFocused = new EventEmitter();

  // Constructor
  constructor(
    private location: Location,
    private service: DocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private terceroSearchService: TerceroSearchService,
    private serviceData: DataService
  ) {

    // Definimos texto boton y titulo
    this .path = this .router .url;
    console .log( 'Validate Path: ' + this .path );
    console .log( 'Titulo: ' + this .title );
    
		if( this .path == '/entradas' ) {
			this .title += 'Entrada';
      console .log ( 'Titulo Agrega : ' + this .title );
		}
		if( this .path == '/salidas' ) {
			this .title += 'Salida';
		}
		if( this .path == '/compras' ) {
			this .title += 'Compra';
		}
		if( this .path == '/ventas' ) {
			this .title += 'Venta';
		}
	
    console .log ( 'Titulo Afuera : ' + this .title );
      // Inicializando atributos
      this.codigo;
      this.estado = [
          new cEstado( 'A', 'Activo' ),
          new cEstado( 'I', 'Inactivo' ),
      ];
    }

  // Implements de Angular 2
  ngOnInit() {

    this .frmDocumento = new FormGroup({
        id                  : new FormControl(),
        codigo              : new FormControl(),
        descripcion         : new FormControl(),
        concepto            : new FormControl(),
        fecha               : new FormControl(),
        direccion           : new FormControl(),
        bodegaOrigen        : new FormControl(),
        bodegaDestino       : new FormControl(),
        tercero             : new FormControl()  
    });

    console .log ( 'router: ' + this.router);
    this.sub = this.route.params.subscribe(params => {
        /* ----------
          13-Ago-2016   -  Fernando Bermeo
      s    depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
          "undefined", por eso se hacen las dos comparaciones
        ---------- */

// 
        this .serviceData.getData() .then( data => { 
          this .data = data;
          this .conceptos = this.data['0'].conceptos;
          this .origenes  = this.data['0'].origenes;
          this .destinos  = this.data['0'].destinos;

          // --------- Ciclo de prueba para recorrer los campos de la estructura
          /*
          let a = this.data[0].marcas;
          a.forEach(o => {
            console .log( '+++' + o['nombre'] );
            this .marcas = o
            debugger;
          });
          --------- */
        });


        if (params['codigo'] !== undefined && params['codigo'] !== "undefined") {
            // Si el parametro codigo no esta definido entonces se trata de un nuevo registro
            this.esNuevo = false;
            this.codigo  = params['codigo'];
            this.service.getRecord(this.codigo)
                .then(obj => {
                    try {
                      this.vObj = obj;
                      this.frmDocumento.setValue(this.vObj);
                      this .validateFields();
                      this.esNuevo =  false; 
                    } catch (error) {
                      console .log( error );
                    }
                });
        } else {
            try {
              this.vObj = new Documento();
              this.frmDocumento.setValue(new Documento());
              this .validateFields();
              this.esNuevo =  true; 
            } catch (error) {
              console .log( error );
            }
        }
    });

    // BUSQUEDA
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

  // Configuración de validaciones de
  validateFields() {
    this .frmDocumento .controls[ "codigo" ] .setValidators([ 
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmDocumento .controls[ "descripcion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Methods
  goToList(obj: Documento = null) {
    this.close.emit(obj);
    this .location .back();
  }

  save(){
    console .log( 'this .frmDocumento .value :' + this.frmDocumento.value );

    this.service
      .save( this.frmDocumento.value, this.esNuevo )
      .then( obj => {
        this .vObj = obj;
        this .goToList( obj );
      })
      .catch( error => this .error = error );
  }

  errors( name: string ){

    let resp: string = '';
    let error: any;

    let fields = { 
      codigo: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 2 o más números y/o caracteres.',
        maxlength:     'Hasta 10 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos sin espacios'
      },
      descripcion: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 10 o más números y/o caracteres.',
        maxlength:     'Hasta 80 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos y algunos símbolos.'
      }
    }

    for ( error in this .frmDocumento.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }  

  /* BUSQUEDA */
  // Push a search term into the observable stream.
  search( term: string ): void {
    this.searchTerms.next( term );
  }

  gotoDetail(obj: Tercero): void {
    let link = ['/terceros', obj.id];
    this.router.navigate(link);
  }

  showDetail(obj: Tercero): void {
    
    if ( obj .razon_social != '' ) {
      this .obj = obj;
      this .razon_social = obj .razon_social;
    }
  
  }

}
