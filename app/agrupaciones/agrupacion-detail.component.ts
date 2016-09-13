// Imports del core de Angular 2 necesarios para este componente
import { Component,
         EventEmitter,
         Input,
         OnInit,
         OnDestroy,
         Output }           from '@angular/core';
import { Router,
         ActivatedRoute }   from '@angular/router';
import { Location }         from '@angular/common';
/*import { FormBuilder, Validators}       from '@angular/common';*/
import { Form, FormControl, FormGroup, Validators }         from '@angular/forms';
//import { REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES }  from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

// Imports personalizados necesarios para este componente
import { AgrupacionService } from './agrupacion.service';
import { Agrupacion }        from './agrupacion';
import { cTipoFP }           from '../_tipos/cTipos-FP';
import { cEstado }           from '../_tipos/cEstado';

// Decorator
@Component({
  selector    : 'agrupacion',
  templateUrl : '../app/agrupaciones/agrupacion-detail.component.html'
})

// Class
export class AgrupacionDetailComponent implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private form            : FormGroup;
  private obj             : Agrupacion;
  private error           : any;
  private sub             : any;
  private codigo          : string;
  private esNuevo         : boolean = false;
  private tiposFormasPago : cTipoFP[];
  private estado          : cEstado[];

  private title           : string;
  private path            : string;

  // Constructor
  constructor(
    private location: Location,
    private service: AgrupacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Definimos texto boton y titulo
		this .title = 'Agrupación';

    // Inicializando atributos
    this.codigo = '';
    this.tiposFormasPago = [
        new cTipoFP( 1, 'Efectivo/convencional'    , true ),
        new cTipoFP( 2, 'Tipo multiple'            , true ),
        new cTipoFP( 3, 'Tarjetas Datafono'        , true ),
        new cTipoFP( 4, 'Cheques'                  , true ),
        new cTipoFP( 5, 'Tarjetas imprinter'       , true ),
        new cTipoFP( 6, 'Vales'                    , true ),
        new cTipoFP( 7, 'Bonos'                    , true ),
        new cTipoFP( 8, 'Transferencia electronica', true ),
        new cTipoFP( 9, 'Consignación directa'     , true ),
        new cTipoFP( 10, 'Tarjeta prepago'         , true )
    ];
    this.estado = [
        new cEstado('A', 'Activo'),
        new cEstado('I', 'Inactivo'),
    ];
  }

  // Implements de Angular 2
  ngOnInit() {

    this .form = new FormGroup({
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
              .then(obj => {
                  this.obj = obj;
                  this.form.setValue(this.obj);
                  this.esNuevo =  false;
                });
        } else {
            this.obj = new Agrupacion();
            this.form.setValue(new Agrupacion());
            this.form.controls["codigo"].setValidators(Validators.minLength(2));
            this.esNuevo =  true;
        }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Methods
  goToList(obj: Agrupacion = null) {
    this.close.emit(obj);
    this .location .back();
  }

  save(){
    this.service
      .save(this.form.value, this.esNuevo )
      .then(obj => {
        this.obj = obj;
        this.goToList(obj);
      })
      .catch(error => this.error = error);
  }
  errors(obj: FormControl){
    /*obj = obj + " xxxxx";
    return obj;*/
    let resp = '';
    let error: any;
    for (error in obj.errors){
      switch (error) {
        case "required" :
          resp += 'Debe digitar un dato';
          break;

        default:

          break;
      }

    }


    return resp;

  }
}
