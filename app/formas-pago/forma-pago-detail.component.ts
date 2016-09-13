import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FormaPagoService } from './forma-pago.service';
import { FormaPago } from './forma-pago';
import { cTipoFP} from '../_tipos/cTipos-FP';
import { cEstado} from '../_tipos/cEstado';

@Component({
  selector: 'formas-de-pago',
  templateUrl: '../app/formas-pago/forma-pago-detail.component.html'
})  

export class FormaPagoDetailComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter();

  // Atributos 
  private vObj: FormaPago;
  private codigo: string;
  private tiposFormasPago: cTipoFP[];
  private estado: cEstado[];
  private sub: any;
  private esNuevo: boolean = false;
  private error: any;
  private title = 'Formas de pago';
  private botonGuardar = 'Guardar';
  private botonRegresar = 'Regresar';

  form = new FormGroup({
      id          : new FormControl(),
      codigo      : new FormControl(),
      descripcion : new FormControl(),
      estado      : new FormControl(),
      tipo        : new FormControl(),
      editable    : new FormControl(),
      borrable    : new FormControl()
  });
  
  // Constructor
  constructor(
    private router: ActivatedRoute,
    private service: FormaPagoService
  ) { }

  ngOnInit() {
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
        new cEstado('A', 'Activo' ),
        new cEstado('I', 'Inactivo' ),
    ];
    this.sub = this.router.params.subscribe(params => {
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
              .then( formapago => {
                      this .vObj = formapago;
                      this .form .setValue( this.vObj );
                      console .log( 'Nuevo: ' + this.esNuevo );
                      this .validateFields();
                      this .esNuevo =  false;
                      
              });
        } 
        else {
          this .vObj = new FormaPago();
          this .form .setValue( new FormaPago() );
          this .validateFields();
          this .esNuevo =  true;
          console .log( 'Nuevo: ' + this.esNuevo );
        }
    });
  }

  // Configuración de validaciones de
  validateFields() {
    this .form .controls[ "codigo" ] .setValidators([ 
            Validators .minLength( 2 ), 
            Validators .maxLength( 10 ),
            Validators .pattern( '^[0-9]+([0-9]+)?$' )
    ]);
    this .form .controls[ "descripcion" ] .setValidators([ 
            Validators .minLength( 10 ), 
            Validators .maxLength( 30 ),
            Validators .pattern( '^[a-zA-Z]+([a-zA-Z]+)?$' )
    ]);
  }

  ngOnDestroy() {
    this .sub .unsubscribe();
  }

  goToList( obj: FormaPago = null) {
    this .close .emit( obj );
    window.history.back();
    //alert (window.location.pathname);    
  }

  save(){
    this .service .save(this.form.value,this.esNuevo)
                  .then(formapago => {
                    this.vObj = formapago;
                    this.goToList( formapago );
                  })
    .catch(error => this.error = error);
  }

  errors(data: FormControl){

    let resp = '';
    let error: any;

    for ( error in data.errors ){

      switch (error) {
        case "required"  : resp += 'Debe digitar un dato ';        break;
        case "minlength" : resp += 'Digite 2 o más caracteres ';   break;  
        case "maxlength" : resp += 'Digite hasta 10 caracteres ';  break; 
        case "pattern"   : resp += 'Solo admite números enteros '; break;      
        default          : resp += 'Default: ' + error ;           break;
      }
    }

    return resp;
  }
}