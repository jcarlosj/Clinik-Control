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

// Imports personalizados necesarios para este componente
import { Path, Validate }      from '../paths';
import { DocumentoService } from './documento.service';
import { Documento }        from './documento';
import { cTipoTabla }          from '../_tipos/c-tipo-tabla';
import { cEstado }             from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'documentos-detail',
  templateUrl : 'documento-detail.component.html'
})

// Class
export class DocumentoDetail implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private frmDocumento : FormGroup;
  private vObj            : Documento;
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
  

  // Constructor
  constructor(
    private location: Location,
    private service: DocumentoService,
    private route: ActivatedRoute,
    private router: Router
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
      this.codigo = '';
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
        estado              : new FormControl(),
        registros           : new FormControl()
    });

    console .log ( 'router: ' + this.router);
    this.sub = this.route.params.subscribe(params => {
        /* ----------
          13-Ago-2016   -  Fernando Bermeo
      s    depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
          "undefined", por eso se hacen las dos comparaciones
        ---------- */
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
}
