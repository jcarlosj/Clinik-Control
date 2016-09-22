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
  selector: 'tipos-impuesto',
  templateUrl: Path.Server.TEMPLATE + 'tipos-impuesto/tipo-impuesto-detail.component.html'
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
  private tiposImpuesto   : cTiposImpuestos[];
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
    this.tiposImpuesto = [
        new cTiposImpuestos( '1', 'ReteFuente', true ),
        new cTiposImpuestos( '2', 'ReteIva', true ),
        new cTiposImpuestos( '3', 'Iva', false ),
        new cTiposImpuestos( '4', 'Otros', false )
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
          id                : new FormControl(),
          codigo            : new FormControl(),
          codigoAlternativo : new FormControl(),
          descripcion       : new FormControl(),
          porcentaje        : new FormControl(),
          base              : new FormControl(),
          tipoImpuesto      : new FormControl(),
          estado            : new FormControl(),
          idUsuarioCrea     : new FormControl(),
          idUsuarioModifica : new FormControl(),
          fechaCreacion     : new FormControl(),
          fechaModificacion : new FormControl(),
          registros         : new FormControl()
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
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTipoImpuesto .controls[ "descripcion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
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
        minlength:     'Debe tener 2 o más caracteres.',
        maxlength:     'Debe tener hasta 10 caracteres.',
        pattern:       'Solo admite valores enteros'
      },
      descripcion: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
    }

    for ( error in this .frmTipoImpuesto.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}