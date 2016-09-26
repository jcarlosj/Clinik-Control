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
  selector: 'tercero',
  templateUrl: Path.Server.TEMPLATE + 'terceros/tercero-detail.component.html'
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
  private grupoSanguineo      : any;
  private estadoCivil         : any;
  private profesionOficio     : any;
  private eps                 : any;
  private profesionalAsignado : any;
  private tipoPersona         : any;
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
          id                    : new FormControl(),
          codigo                : new FormControl(),
          tipoDocIdentificacion : new FormControl(),
          numeroIdentificacion  : new FormControl(),
          ciudadExpedicion      : new FormControl(),
          dv                    : new FormControl(),
          razonSocial           : new FormControl(),
          nombre1               : new FormControl(),
          nombre2               : new FormControl(),
          apellido1             : new FormControl(),
          apellido2             : new FormControl(),
          //--- DATOS UBICACION ---
          direccion             : new FormControl(),
          idCiudad              : new FormControl(),
          idBarrio              : new FormControl(),
          telefonoFijo          : new FormControl(),
          telefonoMovil         : new FormControl(),
          eMail                 : new FormControl(),
          idZona                : new FormControl(),
          //--- DATOS PERSONALES ---
          fechaNacimiento       : new FormControl(),
          lugarNacimiento       : new FormControl(),   
          grupoSanguineo        : new FormControl(),
          sexo                  : new FormControl(),        
          estadoCivil           : new FormControl(),
          profesionOficio       : new FormControl(),
          idEPS                 : new FormControl(),
          //--- DATOS CLINIK CONTROL ---
          tieneConvenio         : new FormControl(),
          tipoAfiliacion        : new FormControl(),
          idProfesionalAsignado : new FormControl(),
          //--- PARAMETROS LEGALES ---
          exentoIVA             : new FormControl(),
          autoretenedor         : new FormControl(),
          tipoPersona           : new FormControl(),
          //--- PARAMETROS CONTROLES CXC CXP Y CAJA ---
          cupoCredito           : new FormControl(),
          diasPlazo             : new FormControl(),
          listaPrecios          : new FormControl(),
          porcDtoContado        : new FormControl(),
          porcDtoCredito        : new FormControl(),
          afiliadoFidelizacion  : new FormControl(),
          tipoImpresionFV       : new FormControl(),
          //--- MANEJAR PESTAÑAS ---
          //referenciasTerceros   : new FormControl(),
          //observaciones         : new FormControl(),
          //tipoTercero           : new FormControl(),
          //--- CONTROL ---
          estado                : new FormControl(),
          idUsuarioCrea         : new FormControl(),
          idUsuarioModifica     : new FormControl(),
          fechaCrea             : new FormControl(),
          fechaModifica         : new FormControl(),
          registros             : new FormControl()
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
          this .grupoSanguineo      = this.data['0'].grupoSanguineo;
          this .estadoCivil         = this.data['0'].estadoCivil;
          this .profesionOficio     = this.data['0'].profesionOficio;
          this .eps                 = this.data['0'].eps;
          this .profesionalAsignado = this.data['0'].profesionalAsignado;
          this .tipoPersona         = this.data['0'].tipoPersona;
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
                      this .vObj = obj;
                      this .frmTercero .setValue( this.vObj );
                      console .log( 'Nuevo: ' + this.esNuevo );
                      this .validateFields();
                      this .esNuevo =  false; 
              });
        } 
        else {
          this .vObj = new Tercero();
          this .frmTercero .setValue( new Tercero() );
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

    //--- PRECIOS Y DATOS ESTADISTICOS ---
    this .frmTercero .controls[ "codigo" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 2 ), 
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.CODIGO )
    ]);
    this .frmTercero .controls[ "numeroIdentificacion" ] .setValidators([
            Validators .required,  
            Validators .minLength( 7 ), 
            Validators .maxLength( 15 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);
    this .frmTercero .controls[ "dv" ] .setValidators([ 
            Validators .maxLength( 1 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "razonSocial" ] .setValidators([ 
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
    this .frmTercero .controls[ "telefonoFijo" ] .setValidators([
            Validators .minLength( 7 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "telefonoMovil" ] .setValidators([
            Validators .minLength( 10 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "eMail" ] .setValidators([ 
            Validators .maxLength( 100 ),
            Validators .pattern( Validate.RegExp.EMAIL )
    ]);
    /*this .frmTercero .controls[ "fechaNacimiento" ] .setValidators([ 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);*/
    this .frmTercero .controls[ "cupoCredito" ] .setValidators([ 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmTercero .controls[ "diasPlazo" ] .setValidators([ 
            Validators .maxLength( 3 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "listaPrecios" ] .setValidators([ 
            Validators .maxLength( 1 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmTercero .controls[ "porcDtoContado" ] .setValidators([ 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL ),
            this .validaRangoPorcDtoContado
    ]);
    this .frmTercero .controls[ "porcDtoCredito" ] .setValidators([ 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL ),
            this .validaRangoPorcDtoCredito
    ]);
    //--- PARAMETROS (Legales) ---
    
  }

  validaRangoPorcDtoContado( porcDtoContado: FormControl ) {
      console.log( 'procentaje: ' + porcDtoContado .value);
      return parseFloat( porcDtoContado .value ) >= parseFloat( '0' ) && parseFloat( porcDtoContado .value ) <= parseFloat( '100' ) ? null : {
        range: true
      }
  }

  validaRangoPorcDtoCredito( porcDtoCredito: FormControl ) {
      console.log( 'procentaje: ' + porcDtoCredito .value);
      return parseFloat( porcDtoCredito .value ) >= parseFloat( '0' ) && parseFloat( porcDtoCredito .value ) <= parseFloat( '100' ) ? null : {
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
      numeroIdentificacion: {
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
      telefonoFijo: {
        minlength:     'Mínimo 7 o más números.',
        maxlength:     'Hasta 20 números',
        pattern:       'Solo valores numéricos.'
      },
      telefonoMovil: {
        minlength:     'Mínimo 10 o más números.',
        maxlength:     'Hasta 20 números.',
        pattern:       'Solo valores numéricos.'
      },            
      eMail: {
        maxlength:     'Hasta 100 números y/o caracteres.',
        pattern:       'Solo valores alfanuméricos y el símbolo @.'
      },
      cupoCredito: {
        maxlength:     'Hasta 10 números',
        pattern:       'Solo valores enteros o decimales.'
      },      
      diasPlazo: {
        maxlength:     'Hasta 3 números',
        pattern:       'Solo valores enteros.'
      },  
      listaPrecios: {
        maxlength:     'Ingresar 1 digito.',
        pattern:       'Solo valores enteros o decimales.'
      },      
      porcDtoContado: {
        maxlength:     'Hasta 5 números punto decimal incluido.',
        pattern:       'Solo valores enteros o decimales.',
        range:         'Establezca un rango entre 0-100'              
      },  
      porcDtoCredito: {
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