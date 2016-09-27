// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }             from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { Location }                           from '@angular/common';

// Imports personalizados necesarios para este componente
import { Path, Validate }      from '../paths';
import { TipoImpuestoService } from './tipo-impuesto.service';
import { TipoImpuesto }        from './tipo-impuesto';
import { cTiposImpuestos }     from '../_tipos/c-tipos-impuesto';
import { cEstado}              from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'tipo-impuesto-detail',
  templateUrl : 'tipo-impuesto-detail.component.html'
})  

// Clase principal del componente
export class TipoImpuestoDetailComponent implements OnInit, OnDestroy {

  // Decorador
  @Output() close = new EventEmitter();

  // Atributes 
  private frmTipoImpuesto : FormGroup;
  private vObj            : TipoImpuesto;
  private codigo          : string;
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  private tiposDeImpuesto : cTiposImpuestos[];
  // Definimos texto boton y titulo
  private title         = 'Tipo de impuesto';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';
  
  // Constructor
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: TipoImpuestoService
  ) { 

    // Inicializando atributos
    this.codigo = '';
    this.tiposDeImpuesto = [
        new cTiposImpuestos( 'RF', 'ReteFuente', true ),
        new cTiposImpuestos( 'RICA', 'ReteICA', true ),
        new cTiposImpuestos( 'RIVA', 'ReteIVA', true ),
        new cTiposImpuestos( 'IVA', 'IVA', false ),
        new cTiposImpuestos( 'O', 'Otros', false )
    ];
    this.estado = [
        new cEstado( 'A', 'Activo' ),
        new cEstado( 'I', 'Inactivo' )
    ];
  }

  // Implements de Angular 2
  ngOnInit() {

    // Inicializando atributos
    this .frmTipoImpuesto = new FormGroup({
          id                  : new FormControl(),
          codigo              : new FormControl(),
          codigo_alternativo  : new FormControl(),
          descripcion         : new FormControl(),
          porcentaje          : new FormControl(),
          base                : new FormControl(),
          tipo_impuesto       : new FormControl(),
          estado              : new FormControl(),
          id_usuario_crea     : new FormControl(),
          id_usuario_modifica : new FormControl(),
          fecha_creacion      : new FormControl(),
          fecha_modificacion  : new FormControl(),
          registros           : new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
        /* ---------- 
            13-Ago-2016   -  Fernando Bermeo
            depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
            "undefined", por eso se hacen las dos comparaciones
        ---------- */
        if (params['codigo'] !== undefined && params['codigo'] !== "undefined") {
          // Si el parametro codigo no esta definido entonces se trata de un nuevo registro
          this.esNuevo =  false;
          this.codigo = params['codigo'];
          this.service.getRecord(this.codigo)
              .then( obj => {
                      this .vObj = obj;
                      this .frmTipoImpuesto .setValue( this.vObj );
                      console .log( 'Nuevo: ' + this.esNuevo );
                      this .validateFields();
                      this .esNuevo =  false;
                      
              });
        } 
        else {
          this .vObj = new TipoImpuesto();
          this .frmTipoImpuesto .setValue( new TipoImpuesto() );
          this .validateFields();
          this .esNuevo =  true;
          console .log( 'Nuevo: ' + this.esNuevo );
        }
    });
  } 

  ngOnDestroy() {
    this .sub .unsubscribe();
  }

  // Methods

  // Configuración de validaciones de campos del formulario
  validateFields() {

    this .frmTipoImpuesto .controls[ "codigo" ] .setValidators([
            Validators .required,  
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmTipoImpuesto .controls[ "codigo_alternativo" ] .setValidators([ 
            Validators .required,  
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmTipoImpuesto .controls[ "descripcion" ] .setValidators([
            Validators .required,   
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmTipoImpuesto .controls[ "porcentaje" ] .setValidators([   
            Validators .maxLength( 5 ),
            Validators .pattern( Validate.RegExp.DECIMAL ),
            this. validaRangoPorcentaje
    ]);
    this .frmTipoImpuesto .controls[ "base" ] .setValidators([   
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    
  }

  validaRangoPorcentaje( porcentaje: FormControl ) {
      console.log( 'procentaje: ' + porcentaje .value);
      return parseFloat( porcentaje .value ) >= parseFloat( '0' ) && parseFloat( porcentaje .value ) <= parseFloat( '100' ) ? null : {
        range: true
      }
  }

  goToList( obj: TipoImpuesto = null) {
    this .close .emit( obj );
    this .location .back();   
  }

  save(){
    this .service .save(this.frmTipoImpuesto.value,this.esNuevo)
                  .then( obj => {
                    this.vObj = obj;
                    this.goToList( obj );
                  })
    .catch(error => this.error = error);
  }

  // Manejador de mensajes de ERROR de campos del formulario
  errors( name: string ){

    let resp: string = '';
    let error: any;

    // Configuracion de mensaje por campo
    let fields = { 
      codigo: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 2 o más números y/o caracteres.',
        maxlength:     'Hasta 10 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos sin espacios'
      },
      codigo_alternativo: {
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
      },
      porcentaje: {
        maxlength:     'Hasta 5 números punto decimal incluido.',
        pattern:       'Solo valores enteros y decimales.',
        range:         'Establezca un rango entre 1-100'
      },
      base: {
        maxlength:     'Hasta 9 números.',
        pattern:       'Solo valores enteros.'
      }
    }

    for ( error in this .frmTipoImpuesto.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}