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
import { TablaGeneralService } from './tabla-general.service';
import { TablaGeneral }        from './tabla-general';
import { cTipoTabla }          from '../_tipos/c-tipo-tabla';
import { cEstado }             from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'tablas-generales-detail',
  templateUrl : 'tabla-general-detail.component.html'
})

// Class
export class TablaGeneralDetail implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private frmTablaGeneral : FormGroup;
  private vObj            : TablaGeneral;
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
    private service: TablaGeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Definimos texto boton y titulo
    this .path = this .router .url;
    console .log( 'Validate Path: ' + this .path );
    console .log( 'Titulo: ' + this .title );
    
		if( this .path == '/marca' ) {
			this .title += 'Marcas';
      console .log ( 'Titulo Agrega : ' + this .title );
		}
		if( this .path == '/presentacion_medicamento' ) {
			this .title += 'Presentación de medicamentos';
		}
		if( this .path == '/vias_administracion' ) {
			this .title += 'Vías de administración';
		}
		if( this .path == '/riesgo_procedimiento' ) {
			this .title += 'Riesgos de procedimiento';
		}
		if( this .path == '/unidades_medida' ) {
			this .title += 'Unidades de medida';
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

    this .frmTablaGeneral = new FormGroup({
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
            this.service.getTablaGeneral(this.codigo)
                .then(obj => {
                    try {
                      this.vObj = obj;
                      this.frmTablaGeneral.setValue(this.vObj);
                      this .validateFields();
                      this.esNuevo =  false; 
                    } catch (error) {
                      console .log( error );
                    }
                });
        } else {
            try {
              this.vObj = new TablaGeneral();
              this.frmTablaGeneral.setValue(new TablaGeneral());
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
    this .frmTablaGeneral .controls[ "codigo" ] .setValidators([ 
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmTablaGeneral .controls[ "descripcion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Methods
  goToList(obj: TablaGeneral = null) {
    this.close.emit(obj);
    this .location .back();
  }

  save(){
    console .log( 'this .frmTablaGeneral .value :' + this.frmTablaGeneral.value );

    this.service
      .save( this.frmTablaGeneral.value, this.esNuevo )
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

    for ( error in this .frmTablaGeneral.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }  
}
