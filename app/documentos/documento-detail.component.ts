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
import { DataService }     from '../data.service';
import { cTipoTabla }          from '../_tipos/c-tipo-tabla';
import { cEstado }             from '../_tipos/cEstado';

import { Tercero }          from '../terceros/tercero';
import { Producto }          from '../productos/producto';   
import { TerceroSearchService } from '../terceros/tercero-search.service';
import { ProductoSearchService } from '../productos/producto-search.service';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'documentos-detail',
  templateUrl : 'documento-detail.component.html',
  //styleUrls   : [ 'documento-detail.component.css' ],
  providers   : [ TerceroSearchService, ProductoSearchService ]
})

// Class
export class DocumentoDetail implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private frmDocumento    : FormGroup;
  private vObj            : Documento;
  tercero = new Tercero();
  producto = new Producto();
  private codigo          : string;
  //private tiposTablas     : cTipoTabla[];
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  private path            : string;

  // Definimos texto boton y titulo
  private title         = 'Documentos';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';

  private data      : any[];
  private conceptos : any;
  private origenes  : any;
  private destinos  : any;

  // BUSQUEDA
  objTercero = new Tercero();
  terceros: Observable<Tercero[]>;
  private tercero_razon_social: string = '';
  private tercero_terminos = new Subject<string>();          // <--- Terminos de busqueda de Terceros

  objProducto = new Producto();
  productos: Observable<Producto[]>;
  private producto_descripcion1: string = '';
  private producto_terminos = new Subject<string>();          // <--- Terminos de busqueda de Producto
  
  
  private inputFocused = new EventEmitter();

  // Constructor
  constructor(
    private location: Location,
    private service: DocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private terceroSearchService: TerceroSearchService,
    private productoSearchService: ProductoSearchService,
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
        tercero             : new FormControl(),
        producto            : new FormControl()  
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


// BUSQUEDA TERCEROS
    this.terceros = this.tercero_terminos
      .debounceTime(300)        // Espera de 300ms (frecuencia de peticiones)
      .distinctUntilChanged()   // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
      .switchMap( term => term   // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
        // Retorna la búsqueda http observables
        ? this.terceroSearchService.search(term)
        // o lo observable del herpes vacías si no hay término de búsqueda
        : Observable.of<Tercero[]>([]))
      .catch(error => {
        // HACER: control de errores reales
        console.log(error);
        return Observable.of<Tercero[]>([]);
      });

    // BUSQUEDA PRODUCTOS
    this.productos = this.producto_terminos
      .debounceTime(300)        // Espera de 300ms (frecuencia de peticiones)
      .distinctUntilChanged()   // Asegura que solo si cambia el termino de busqueda se realiza una nueva busqueda
      .switchMap( term => term   // Cancela y descarta anteriores observables de búsqueda, devolviendo sólo el último servicio de búsqueda observable.
        // Retorna la búsqueda http observables
        ? this.productoSearchService.search(term)
        // o lo observable del herpes vacías si no hay término de búsqueda
        : Observable.of<Producto[]>([]))
      .catch(error => {
        // HACER: control de errores reales
        console.log(error);
        return Observable.of<Producto[]>([]);
      });

      console .log( '> this.productos: ' + Object.keys( this .productos ) );
      console .log( '> this.terceros: ' + Object.keys( this .terceros ) );
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
  searchTerceros( term: string ): void {
    console .log( 'term: ' + term);
    this.tercero_terminos.next( term );
  }
  
  searchProductos( term: string ): void {
    console .log( 'term: ' + term);
    this.producto_terminos.next( term );
  }

  showDetailTercero(obj: Tercero): void {
    
    if ( obj .razon_social != '' ) {
      this .objTercero = obj;
      this .tercero_razon_social = obj .razon_social;
    }
  
  }

  showDetailProducto(obj: Producto): void {
    
    if ( obj .descripcion1 != '' ) {
      this .objProducto = obj;
      this .producto_descripcion1 = obj .descripcion1;
    }
  
  }

}
