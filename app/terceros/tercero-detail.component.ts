// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }             from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { Location }                           from '@angular/common';

// Imports personalizados necesarios para este componente
import { Path, Validate }  from '../paths';
import { TerceroService }  from './tercero.service';
import { Tercero }         from './tercero';
import { Activaciones }    from '../_tipos/c-activaciones';
import { DataService }     from '../data.service';
import { cEstado }         from '../_tipos/cEstado';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'tercero-details',
  templateUrl : 'tercero-detail.component.html'
})  

// Clase principal del componente
export class TerceroDetailComponent implements OnInit, OnDestroy {

  // Decorador
  @Output() close = new EventEmitter();

  // Atributes 
  private frmTercero    : FormGroup;
  private vObj            : Tercero;
  private codigo          : string;
  private activaciones    : Activaciones[];
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  // Definimos texto boton y titulo
  private title         = 'Tercero';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';
  // Carga datos adicionales
  private data: any[];

  private ciudades            : any;
  private barrios             : any;
  private zonas               : any;
  private tipoDocumento       : any;
  private sexo                : any;
  private grupo_sanguineo      : any;
  private estado_civil         : any;
  private profesion_oficio     : any;
  private eps                 : any;
  private profesionalAsignado : any;
  private tipo_persona         : any;
  private tipoImpresion       : any;

  // Constructor
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: TerceroService,
    private serviceData: DataService
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
    this .frmTercero = new FormGroup({
          //--- DATOS BÁSICOS ---
          id                      : new FormControl(),
          codigo                  : new FormControl(),
          tipo_doc_identificacion : new FormControl(),
          numero_identificacion   : new FormControl(),
          ciudad_expedicion       : new FormControl(),
          dv                      : new FormControl(),
          razon_social            : new FormControl(),
          nombre1                 : new FormControl(),
          nombre2                 : new FormControl(),
          apellido1               : new FormControl(),
          apellido2               : new FormControl(),
          //--- DATOS UBICACION ---
          direccion               : new FormControl(),
          id_ciudad               : new FormControl(),
          id_barrio               : new FormControl(),
          telefono_fijo           : new FormControl(),
          telefono_movil          : new FormControl(),
          e_mail                  : new FormControl(),
          id_zona                 : new FormControl(),
          //--- DATOS PERSONALES ---
          fecha_nacimiento        : new FormControl(),
          lugar_nacimiento        : new FormControl(),   
          grupo_sanguineo         : new FormControl(),
          sexo                    : new FormControl(),        
          estado_civil            : new FormControl(),
          profesion_oficio        : new FormControl(),
          id_eps                  : new FormControl(),
          //--- DATOS CLINIK CONTROL ---
          tiene_convenio          : new FormControl(),
          tipo_afiliacion         : new FormControl(),
          id_profesional_asignado : new FormControl(),
          //--- PARAMETROS LEGALES ---
          exento_iva              : new FormControl(),
          autoretenedor           : new FormControl(),
          tipo_persona            : new FormControl(),
          //--- PARAMETROS CONTROLES CXC CXP Y CAJA ---
          cupo_credito            : new FormControl(),
          dias_plazo              : new FormControl(),
          lista_precios           : new FormControl(),
          porc_dto_contado        : new FormControl(),
          porc_dto_credito        : new FormControl(),
          afiliado_fidelizacion   : new FormControl(),
          tipo_impresion_fv       : new FormControl(),
          //--- MANEJAR PESTAÑAS ---
          //referenciasTerceros   : new FormControl(),
          //observaciones         : new FormControl(),
          //tipoTercero           : new FormControl(),
          //--- CONTROL ---
          estado                  : new FormControl(),
          registros               : new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
        /* ---------- 
            13-Ago-2016   -  Fernando Bermeo
            depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
            "undefined", por eso se hacen las dos comparaciones
        ---------- */

        // 
        this .serviceData.getData() .then( data_terceros => { 
          this .data = data_terceros;
          this .ciudades            = this.data['0'].ciudades;
          this .barrios             = this.data['0'].barrios;
          this .zonas               = this.data['0'].zonas;
          this .tipoDocumento       = this.data['0'].tipoDocumento;
          this .sexo                = this.data['0'].sexo;
          this .grupo_sanguineo     = this.data['0'].grupo_sanguineo;
          this .estado_civil        = this.data['0'].estado_civil;
          this .profesion_oficio    = this.data['0'].profesion_oficio;
          this .eps                 = this.data['0'].eps;
          this .profesionalAsignado = this.data['0'].profesionalAsignado;
          this .tipo_persona        = this.data['0'].tipo_persona;
          this .tipoImpresion       = this.data['0'].tipoImpresion;

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
          this.esNuevo =  false;
          this.codigo = params['codigo'];
          this.service.getRecord(this.codigo)
              .then( obj => {
                  try {
                      this .vObj = obj;
                      this .frmTercero .setValue( this.vObj );
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
              this .vObj = new Tercero();
              this .frmTercero .setValue( new Tercero() );
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

    //--- PRECIOS Y DATOS ESTADISTICOS ---
    this .frmTercero .controls[ "codigo" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 2 ), 
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmTercero .controls[ "numero_identificacion" ] .setValidators([
            Validators .required,  
            Validators .minLength( 7 ), 
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmTercero .controls[ "dv" ] .setValidators([ 
            Validators .maxLength( 1 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "razon_social" ] .setValidators([ 
            Validators .maxLength( 60 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmTercero .controls[ "nombre1" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 3 ),
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.ALFABETICO )
    ]);
    this .frmTercero .controls[ "nombre2" ] .setValidators([ 
            Validators .minLength( 3 ),
            Validators .maxLength( 14 ),
            Validators .pattern( Validate.RegExp.ALFABETICO )
    ]);
    this .frmTercero .controls[ "apellido1" ] .setValidators([
            Validators .required,
            Validators .minLength( 3 ), 
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.ALFABETICO )
    ]);
    this .frmTercero .controls[ "apellido2" ] .setValidators([
            Validators .minLength( 3 ), 
            Validators .maxLength( 14 ),
            Validators .pattern( Validate.RegExp.ALFABETICO )
    ]);
    //--- PRECIOS Y DATOS ESTADISTICOS ---
    this .frmTercero .controls[ "direccion" ] .setValidators([
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmTercero .controls[ "telefono_fijo" ] .setValidators([
            Validators .minLength( 7 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "telefono_movil" ] .setValidators([
            Validators .minLength( 10 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "e_mail" ] .setValidators([ 
            Validators .maxLength( 100 ),
            Validators .pattern( Validate.RegExp.EMAIL )
    ]);
    /*this .frmTercero .controls[ "fecha_nacimiento" ] .setValidators([ 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);*/
    this .frmTercero .controls[ "cupo_credito" ] .setValidators([ 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "dias_plazo" ] .setValidators([ 
            Validators .maxLength( 3 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "lista_precios" ] .setValidators([ 
            Validators .maxLength( 1 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "porc_dto_contado" ] .setValidators([ 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL ),
            this .validaRangoPorcDtoContado
    ]);
    this .frmTercero .controls[ "porc_dto_credito" ] .setValidators([ 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL ),
            this .validaRangoPorcDtoCredito
    ]);
    //--- PARAMETROS (Legales) ---
    
  }

  validaRangoPorcDtoContado( porc_dto_contado: FormControl ) {
      console.log( 'procentaje: ' + porc_dto_contado .value);
      return parseFloat( porc_dto_contado .value ) >= parseFloat( '0' ) && parseFloat( porc_dto_contado .value ) <= parseFloat( '100' ) ? null : {
        range: true
      }
  }

  validaRangoPorcDtoCredito( porc_dto_credito: FormControl ) {
      console.log( 'procentaje: ' + porc_dto_credito .value);
      return parseFloat( porc_dto_credito .value ) >= parseFloat( '0' ) && parseFloat( porc_dto_credito .value ) <= parseFloat( '100' ) ? null : {
        range: true
      }
  }

  goToList( obj: Tercero = null) {
    this .close .emit( obj );
    this .location .back();   
  }

  save(){
    this .service .save(this.frmTercero.value,this.esNuevo)
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
      //--- IDENTIFICACION DE Tercero ---
      codigo: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 2 o más números y/o caracteres.',
        maxlength:     'Hasta 10  números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos sin espacios'
      },
      numero_identificacion: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 7 o más números.',
        maxlength:     'Hasta 15 números.',
        pattern:       'Solo valores alfanuméricos y algunos símbolos.'
      },
      dv: {
        maxlength:     'Ingresar 1 digito.',
        pattern:       'Solo valores numéricos.'
      },
      nombre1: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 3 o más caracteres.',
        maxlength:     'Hasta 15 caracteres.',
        pattern:       'Solo valores alfabeticos.'
      },
      nombre2: {
        minlength:     'Mínimo 3 o más caracteres.',
        maxlength:     'Hasta 14 caracteres.',
        pattern:       'Solo valores alfabeticos.'
      },      
      apellido1: {
        required:      'Campo requerido.',
        minlength:     'Mínimo 3 o más caracteres.',
        maxlength:     'Hasta 15 caracteres.',
        pattern:       'Solo valores alfabeticos.'
      },
      apellido2: {
        minlength:     'Mínimo 3 o más caracteres.',
        maxlength:     'Hasta 14 caracteres.',
        pattern:       'Solo valores alfabeticos.'
      },          
      direccion: {
        minlength:     'Mínimo 3 o más números y/o caracteres.',
        maxlength:     'Hasta 80 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos y algunos símbolos.'
      },         
      telefono_fijo: {
        minlength:     'Mínimo 7 o más números.',
        maxlength:     'Hasta 20 números',
        pattern:       'Solo valores numéricos.'
      },
      telefono_movil: {
        minlength:     'Mínimo 10 o más números.',
        maxlength:     'Hasta 20 números.',
        pattern:       'Solo valores numéricos.'
      },            
      e_mail: {
        maxlength:     'Hasta 100 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos y el símbolo @.'
      },
      cupo_credito: {
        maxlength:     'Hasta 10 números',
        pattern:       'Solo valores enteros o decimales.'
      },      
      dias_plazo: {
        maxlength:     'Hasta 3 números',
        pattern:       'Solo valores enteros.'
      },  
      lista_precios: {
        maxlength:     'Ingresar 1 digito.',
        pattern:       'Solo valores enteros o decimales.'
      },      
      porc_dto_contado: {
        maxlength:     'Hasta 5 números punto decimal incluido.',
        pattern:       'Solo valores enteros o decimales.',
        range:         'Establezca un rango entre 0-100'              
      },  
      porc_dto_credito: {
        maxlength:     'Hasta 5 números punto decimal incluido.',
        pattern:       'Solo valores enteros o decimales.',
        range:         'Establezca un rango entre 1-100'   
      },               
      
    }

    for ( error in this .frmTercero.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}