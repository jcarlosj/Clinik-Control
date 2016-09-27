// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }             from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { Location }                           from '@angular/common';

// Imports personalizados necesarios para este componente
import { Path, Validate }    from '../paths';
import { AgrupacionService } from './agrupacion.service';
import { Agrupacion }        from './agrupacion';
import { Activaciones }      from '../_tipos/c-activaciones';
import { cEstado}            from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'agrupacion-detail',
  templateUrl : 'agrupacion-detail.component.html'
})  

// Clase principal del componente
export class AgrupacionDetailComponent implements OnInit, OnDestroy {

  // Atributes 
  @Output() close = new EventEmitter();
  private frmAgrupacion   : FormGroup;
  private vObj            : Agrupacion;
  private codigo          : string;
  private activaciones    : Activaciones[];
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  // Definimos texto boton y titulo
  private title         = 'Agrupación';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';
  
  // Constructor
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: AgrupacionService
  ) { 

    // Inicializando atributos
    this.codigo = '';
    this .activaciones = [
        new Activaciones( 'N', 'No' ),
        new Activaciones( 'S', 'Sí' )
    ];
    this.estado = [
        new cEstado( 'A', 'Activo' ),
        new cEstado( 'I', 'Inactivo' )
    ];
  }

  // Implements de Angular 2
  ngOnInit() {

    // Inicializando atributos
    this .frmAgrupacion = new FormGroup({
          id                  : new FormControl(),
          codigo              : new FormControl(),
          descripcion         : new FormControl(),
          codigo_padre        : new FormControl(),
          nivel               : new FormControl(),
          permite_detalle     : new FormControl(),
          orden               : new FormControl(),
<<<<<<< HEAD
          registros           : new FormControl(),
=======
          id_usuario_crea     : new FormControl(),     // <-- Parámetros: Control. 
          id_usuario_modifica : new FormControl(), 
          fecha_creacion      : new FormControl(),
          fecha_modificacion  : new FormControl(),
          registro            : new FormControl(),
>>>>>>> 0f8169bf2ebc5a717ccca094377bb6eab5ecbe70
          estado              : new FormControl()
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
                  try {
                      this .vObj = obj;
                      this .frmAgrupacion .setValue( this.vObj );
                      console .log( 'Nuevo: ' + this.esNuevo );
                      this .validateFields();
                      this .esNuevo =  false;
                  } catch (error) {
                      console .log( error );
                  }  
              });
        } 
        else {
            try {
              this .vObj = new Agrupacion();
              this .frmAgrupacion .setValue( new Agrupacion() );
              this .validateFields();
              this .esNuevo =  true;
              console .log( 'Nuevo: ' + this.esNuevo ); 
            } catch (error) {
              console .log( error );
            }
        }
    });
  } 

  ngOnDestroy() {
    this .sub .unsubscribe();
  }

  // Methods

  // Configuración de validaciones de campos del formulario
  validateFields() {

    this .frmAgrupacion .controls[ "codigo" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmAgrupacion .controls[ "descripcion" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 5 ), 
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmAgrupacion .controls[ "codigo_padre" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 0 ), 
            Validators .maxLength( 3 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmAgrupacion .controls[ "nivel" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 3 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);  
  }

  goToList( obj: Agrupacion = null) {
    this .close .emit( obj );
    this .location .back();   
  }

  save(){
    this .service .save(this.frmAgrupacion.value,this.esNuevo)
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
        minlength:     'Mínimo 2 o más números.',
        maxlength:     'Hasta 10 caracteres.',
        pattern:       'Solo valores enteros'
      },
      descripcion: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 10 o más números.',
        maxlength:     'Hasta 80 caracteres.',
        pattern:       'Solo valores alfanuméricos y algunos símbolos.'
      },
      codigo_padre: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 1 o más números.',
        maxlength:     'Hasta 3 caracteres.',
        pattern:       'Solo valores enteros.'
      },
      nivel: {
        maxlength:     'Hasta 3 números.',
        pattern:       'Solo valores enteros.'
      }
    }

    for ( error in this .frmAgrupacion.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}