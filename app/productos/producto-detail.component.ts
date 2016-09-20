// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }             from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { Location }                           from '@angular/common';

// Imports personalizados necesarios para este componente
import { Path, Validate }  from '../paths';
import { ProductoService } from './producto.service';
import { Producto }        from './producto';
import { Activaciones }    from '../_tipos/c-activaciones';
import { DataService }     from '../data.service';

// Decorator
@Component({
  selector: 'formas-de-pago',
  templateUrl: Path.Server.TEMPLATE + 'productos/producto-detail.component.html'
})  

// Clase principal del componente
export class ProductoDetailComponent implements OnInit, OnDestroy {

  // Decorador
  @Output() close = new EventEmitter();

  // Atributes 
  private frmProducto    : FormGroup;
  private vObj            : Producto;
  private codigo          : string;
  private activaciones    : Activaciones[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  // Definimos texto boton y titulo
  private title         = 'Producto';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';
  // Carga datos adicionales
  private data: any[];
  private agrupaciones: any;
  private marcas: any;
  private presentaciones: any;
  private tiposDeIva: any;
  private unidades: any;
  private vias: any;
  
  // Constructor
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: ProductoService,
    private serviceData: DataService
  ) { 

    // Inicializando atributos
    this.codigo = '';
    this .activaciones = [
        new Activaciones( 'N', 'No' ),
        new Activaciones( 'S', 'Sí' )
    ];
  }

  // Implements de Angular 2
  ngOnInit() {

    // Inicializando atributos
    this .frmProducto = new FormGroup({
          //--- IDENTIFICACION DE PRODUCTO ---
          id                  : new FormControl(),
          codigo              : new FormControl(),
          agrupacion          : new FormControl(),
          descripcion1        : new FormControl(),
          descripcion2        : new FormControl(),
          marca               : new FormControl(),
          codigoBarras        : new FormControl(),
          referencia          : new FormControl(),
          equivalencia        : new FormControl(),
          unidadMedida        : new FormControl(),
          unidadEmpaque       : new FormControl(),
          ubicacionBodega     : new FormControl(),
          //--- PRECIOS Y DATOS ESTADISTICOS ---
          precioVenta1        : new FormControl(),
          precioVenta2        : new FormControl(),
          precioVenta3        : new FormControl(),
          precioVenta4        : new FormControl(),
          precioVenta5        : new FormControl(),
          existencia          : new FormControl(),
          saldoPedido         : new FormControl(),
          costoPromedio       : new FormControl(),   
          costoUltimaCompra   : new FormControl(),
          costoFOB            : new FormControl(), 
          //--- PARAMETROS (Legales) ---
          tipoIVAVenta        : new FormControl(),
          tipoIVACompra       : new FormControl(),
          registroInvima      : new FormControl(),
          numeroMesesGarantia : new FormControl(),
          //--- PARAMETROS (Controles sobre valores y cantidades) ---
          stockMinimo         : new FormControl(),
          stockMaximo         : new FormControl(),
          porcMaxDtoContado   : new FormControl(),
          porcMaxDtoCredito   : new FormControl(),
          porcComisionVenta   : new FormControl(),
          //--- PARAMETROS (Si/No) ---
          productoActivo      : new FormControl(),
          productoSeVende     : new FormControl(),
          precioFijo          : new FormControl(),
          usaControlLotes     : new FormControl(),
          aplicaParaPedido    : new FormControl(),
          usaSeriales         : new FormControl(),
          productoEnConsig    : new FormControl(),
          productoControlado  : new FormControl(),
          permiteNegativos    : new FormControl(),
          //--- PARAMETROS (Varios) ---
          colorAgenda         : new FormControl(),
          presentacion        : new FormControl(),
          viaAdministracion   : new FormControl(),
          //codigoBono          : new FormControl(),
          //--- OTROS ---
          //observnew FormControl(),
          //riesgosAsnew FormControl(),
          //--- CONTROL ---
          //idUsuarioCrea       : new FormControl(),
          //idUsuarioModifica   : new FormControl(),
          //fechaCrea           : new FormControl(),
          //fechaModifica       : new FormControl(),
          //registros           : new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
        /* ---------- 
            13-Ago-2016   -  Fernando Bermeo
            depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
            "undefined", por eso se hacen las dos comparaciones
        ---------- */

        // 
        this .serviceData.getData() .then( data => { 
          this .data = data;
          this .agrupaciones   = this.data['0'].agrupaciones;
          this .marcas         = this.data['0'].marcas;
          this .presentaciones = this.data['0'].presentaciones;
          this .tiposDeIva     = this.data['0'].tiposDeIva;
          this .unidades       = this.data['0'].unidades;
          this .vias           = this.data['0'].vias;

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
                      this .frmProducto .setValue( this.vObj );
                      console .log( 'Nuevo: ' + this.esNuevo );
                      this .validateFields();
                      this .esNuevo =  false; 
              });
        } 
        else {
          this .vObj = new Producto();
          this .frmProducto .setValue( new Producto() );
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
    this .frmProducto .controls[ "codigo" ] .setValidators([ 
            Validators .required,
            Validators .minLength( 2 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmProducto .controls[ "descripcion1" ] .setValidators([
            Validators .required,  
            Validators .minLength( 5 ), 
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "descripcion2" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 80 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "codigoBarras" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.CODIGO_BARRAS )
    ]);
    this .frmProducto .controls[ "referencia" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "equivalencia" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 20 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "unidadEmpaque" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "ubicacionBodega" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    //--- PRECIOS Y DATOS ESTADISTICOS ---
    this .frmProducto .controls[ "precioVenta1" ] .setValidators([
            Validators .required, 
            Validators .minLength( 3 ), 
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "precioVenta2" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "precioVenta3" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "precioVenta4" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "precioVenta5" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 9 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "existencia" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "saldoPedido" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "costoPromedio" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "costoUltimaCompra" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "costoFOB" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    //--- PARAMETROS (Legales) ---
    this .frmProducto .controls[ "registroInvima" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.GENERAL )
    ]);           
    this .frmProducto .controls[ "numeroMesesGarantia" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);  
    //--- PARAMETROS (Controles sobre valores y cantidades) ---
    this .frmProducto .controls[ "stockMinimo" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "stockMaximo" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "porcMaxDtoContado" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "porcMaxDtoCredito" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    this .frmProducto .controls[ "porcComisionVenta" ] .setValidators([ 
            Validators .minLength( 0 ), 
            Validators .maxLength( 2 ),
            Validators .pattern( Validate.RegExp.DECIMAL )
    ]);
    //--- PARAMETROS (Si/No) ---
    // No hay reglas todos son selectores obligatorios
    //--- PARAMETROS (Varios) ---
    this .frmProducto .controls[ "colorAgenda" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 12 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    /*this .frmProducto .controls[ "presentacion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmProducto .controls[ "viaAdministracion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);
    this .frmProducto .controls[ "codigoBono" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( Validate.RegExp.ENTERO )
    ]);                
    //--- OTROS ---
    //--- CONTROL ---
    */
  }

  goToList( obj: Producto = null) {
    this .close .emit( obj );
    this .location .back();   
  }

  save(){
    this .service .save(this.frmProducto.value,this.esNuevo)
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
      //--- IDENTIFICACION DE PRODUCTO ---
      codigo: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 2 o más caracteres.',
        maxlength:     'Debe tener hasta 20 caracteres.',
        pattern:       'Solo admite valores enteros'
      },
      descripcion1: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 80 caracteres.',
        pattern:       'Solo admite valores alfanuméricos.'
      },
      descripcion2: {
        maxlength:     'Debe tener hasta 80 caracteres.',
        pattern:       'Solo admite valores alfanuméricos.'
      },
      codigoBarras: {
        maxlength:     'Debe tener hasta 20 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      referencia: {
        maxlength:     'Debe tener hasta 20 caracteres.',
        pattern:       'Solo admite valores alfanuméricos.'
      },
      equivalencia: {
        maxlength:     'Debe tener hasta 20 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      unidadEmpaque: {
        maxlength:     'Debe tener hasta 12 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      ubicacionBodega: {
        maxlength:     'Debe tener hasta 10 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      //--- PRECIOS Y DATOS ESTADISTICOS ---
      precioVenta1: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      precioVenta2: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      precioVenta3: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      precioVenta4: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      precioVenta5: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },     
      existencia: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      }, 
      saldoPedido: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      }, 
      costoPromedio: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      }, 
      costoUltimaCompra: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      }, 
      costoFOB: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },                                                  
      //--- PARAMETROS (Legales) ---
      tipoIVAVenta: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      tipoIVACompra: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      registroInvima: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      numeroMesesGarantia: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      //--- PARAMETROS (Controles sobre valores y cantidades) ---
      stockMinimo: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      stockMaximo: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      porcMaxDtoContado: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },                  
      porcMaxDtoCredito: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      porcComisionVenta: {
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores decimales.'
      },
      //--- PARAMETROS (Si/No) ---
      // No hay reglas todos son selectores obligatorios
      //--- PARAMETROS (Varios) ---
      colorAgenda: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      //--- OTROS ---
      //--- CONTROL ---
    }

    for ( error in this .frmProducto.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}