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
          id          : new FormControl(),
          codigo      : new FormControl(),
          descripcion : new FormControl(),
          estado      : new FormControl(),
          tipo        : new FormControl(),
          editable    : new FormControl(),
          borrable    : new FormControl()
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

    for ( error in this .frmProducto.controls[ name ].errors ){
        resp += fields[ name ][ error ] + ' ';
    }
    
    return resp;
  }
}