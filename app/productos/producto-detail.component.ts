// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }             from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { Location }                           from '@angular/common';

// Imports personalizados necesarios para este componente
import { ProductoService } from './producto.service';
import { Producto }        from './producto';
import { cTipoFP}           from '../_tipos/cTipos-FP';
import { cEstado}           from '../_tipos/cEstado';

// Decorator
@Component({
  selector: 'formas-de-pago',
  templateUrl: '../app/productos/producto-detail.component.html'
})  

// Clase principal del componente
export class ProductoDetailComponent implements OnInit, OnDestroy {

  // Decorador
  @Output() close = new EventEmitter();

  // Atributes 
  private frmProducto    : FormGroup;
  private vObj            : Producto;
  private codigo          : string;
  private tiposFormasPago : cTipoFP[];
  private estado          : cEstado[];
  private sub             : any;
  private esNuevo         : boolean = false;
  private error           : any;
  // Definimos texto boton y titulo
  private title         = 'Formas de pago';
  private botonGuardar  = 'Guardar';
  private botonRegresar = 'Regresar';
  
  // Constructor
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: ProductoService
  ) { 

    // Inicializando atributos
    this.codigo = '';
    
    this.tiposFormasPago = [
        new cTipoFP( 1, 'Efectivo/convencional', true ),
        new cTipoFP( 2, 'Tipo multiple', true ),
        new cTipoFP( 3, 'Tarjetas Datafono', true ),
        new cTipoFP( 4, 'Cheques', true ),
        new cTipoFP( 5, 'Tarjetas imprinter', true ),
        new cTipoFP( 6, 'Vales', true ),
        new cTipoFP( 7, 'Bonos', true ),
        new cTipoFP( 8, 'Transferencia electronica', true ),
        new cTipoFP( 9, 'Consignación directa', true ),
        new cTipoFP( 10, 'Tarjeta prepago', true )
    ];
    this.estado = [
        new cEstado( 'A', 'Activo' ),
        new cEstado( 'I', 'Inactivo' )
    ];
  }

  // Implements de Angular 2
  ngOnInit() {

    // Inicializando atributos
    this .frmProducto = new FormGroup({
          //--- IDENTIFICACION DE PRODUCTO ---
          id              : new FormControl(),
          codigo          : new FormControl(),
          //agrupacion      : new FormControl(),
          descripcion     : new FormControl(),
          descripcion1    : new FormControl(),
          //marca           : new FormControl(),
          codigoBarras    : new FormControl(),
          referencia      : new FormControl(),
          equivalencia    : new FormControl(),
          //unidadMedida    : new FormControl(),
          unidadEmpaque   : new FormControl(),
          ubicacionBodega : new FormControl(),
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
          //presentacion        : new FormControl(),
          //viaAdministracion   : new FormControl(),
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
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "descripcion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "descripcion1" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "codigoBarras" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "referencia" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "equivalencia" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "unidadEmpaque" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "ubicacionBodega" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    //--- PRECIOS Y DATOS ESTADISTICOS ---
    this .frmProducto .controls[ "precioVenta1" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "precioVenta2" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "precioVenta3" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "precioVenta4" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "precioVenta5" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "existencia" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "saldoPedido" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "costoPromedio" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "costoUltimaCompra" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "costoFOB" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    //--- PARAMETROS (Legales) ---
    this .frmProducto .controls[ "tipoIVAVenta" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "registroInvima" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "tipoIVACompra" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);        
    this .frmProducto .controls[ "numeroMesesGarantia" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);  
    //--- PARAMETROS (Controles sobre valores y cantidades) ---
    this .frmProducto .controls[ "stockMinimo" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "stockMaximo" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "porcMaxDtoContado" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "porcMaxDtoCredito" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "porcComisionVenta" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    //--- PARAMETROS (Si/No) ---
    this .frmProducto .controls[ "productoActivo" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "productoSeVende" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "precioFijo" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "usaControlLotes" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "aplicaParaPedido" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "usaSeriales" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "productoEnConsig" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);    
    this .frmProducto .controls[ "productoControlado" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    this .frmProducto .controls[ "permiteNegativos" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
    //--- PARAMETROS (Varios) ---
    this .frmProducto .controls[ "colorAgenda" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    /*this .frmProducto .controls[ "presentacion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "viaAdministracion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .frmProducto .controls[ "codigoBono" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
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
        maxlength:     'Debe tener hasta 10 caracteres.',
        pattern:       'Solo admite valores enteros'
      },
      descripcion: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      descripcion1: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      codigoBarras: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      referencia: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      equivalencia: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      unidadEmpaque: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      ubicacionBodega: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      //--- PRECIOS Y DATOS ESTADISTICOS ---
      precioVenta1: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      precioVenta2: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      precioVenta3: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      precioVenta4: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      precioVenta5: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },     
      existencia: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      saldoPedido: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      costoPromedio: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      costoUltimaCompra: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      costoFOB: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
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
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      numeroMesesGarantia: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      }, 
      //--- PARAMETROS (Controles sobre valores y cantidades) ---
      stockMinimo: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      stockMaximo: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      porcMaxDtoContado: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },                  
      porcMaxDtoCredito: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      porcComisionVenta: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      //--- PARAMETROS (Si/No) ---
      productoActivo: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      productoSeVende: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      precioFijo: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      usaControlLotes: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      aplicaParaPedido: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },      
      usaSeriales: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      productoEnConsig: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      productoControlado: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
      permiteNegativos: {
        required:      'Campo requerido.',
        minlength:     'Debe tener 10 o más caracteres.',
        maxlength:     'Debe tener hasta 30 caracteres.',
        pattern:       'Solo admite valores alfabéticos.'
      },
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