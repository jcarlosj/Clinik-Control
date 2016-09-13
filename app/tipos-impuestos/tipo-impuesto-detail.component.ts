
// Imports del core de Angular 2 necesarios para este componente
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Router, ActivatedRoute, Params }                            from '@angular/router';
import { FormControl, FormGroup, Validators }        from '@angular/forms';
//import { REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';


// Imports personalizados necesarios para este componente
import { TipoImpuestoService } from './tipo-impuesto.service';
import { TipoImpuesto }        from './tipo-impuesto';
import { cTiposImpuestos }     from '../_tipos/cTiposImpuestos';
import { cEstado }             from '../_tipos/cEstado';

// Decorator
@Component({
  selector    : 'frm-tipos-impuestos',
  templateUrl : '../app/tipos-impuestos/tipo-impuesto-detail.component.html'/*,
  directives  : [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES],*/
})

// Class
export class TipoImpuestoDetailComponent implements OnInit, OnDestroy {

  // Atributes
  @Output() close = new EventEmitter();
  private form           : FormGroup;
  private obj            : TipoImpuesto;
  private error          : any;
  private sub            : any;
  private codigo         : string;
  private title          : string;
  private esNuevo        : boolean = false;
  private estado         : cEstado[];
  private tipoImpuesto   : cTiposImpuestos[];


  // Constructor
  constructor(
    private router  : ActivatedRoute,
    private service : TipoImpuestoService,
    private route  : Router
  ) {

  }

  // Implements de Angular 2
  ngOnInit() {

    this .form = new FormGroup({
        //id                : new FormControl(),
        codigo            : new FormControl(),
        codigoAlternativo : new FormControl(),
        descripcion       : new FormControl(),
        porcentaje        : new FormControl(),
        base              : new FormControl(),
        tipoImpuesto      : new FormControl(),
        estado            : new FormControl(),
        editable          : new FormControl(),
        borrable          : new FormControl(),
        idUsuarioCrea     : new FormControl(),
        idUsuarioModifica : new FormControl(),
        fechaCreacion     : new FormControl(),
        fechaModificacion : new FormControl()
    });

    this.codigo = '';

    this.tipoImpuesto = [
        new cTiposImpuestos( 'RF', 'Rete Fuente', true ),
        new cTiposImpuestos( 'RC', 'Rete ICA'   , true ),
        new cTiposImpuestos( 'RV', 'Rete IVA'   , true ),
        new cTiposImpuestos( 'IV', 'IVA'        , true ),
        new cTiposImpuestos( 'OT', 'Otros'      , true )
    ];
    this.estado = [
        new cEstado('A', 'Activo'),
        new cEstado('I', 'Inactivo'),
    ];
    this.sub = this.router.params.subscribe(params => {
        /* ---------- */
        /*
            13-Ago-2016   -  Fernando Bermeo
            depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
            "undefined", por eso se hacen las dos comparaciones
        */
        /* ---------- */
        if (params['codigo'] !== undefined && params['codigo'] !== "undefined") {
          // Si el parametro codigo no esta definido entonces se trata de un nuevo registro
          this.esNuevo =  false;
          this.codigo = params['codigo'];
           this.service.getTipoImpuesto(this.codigo)
                .then(obj => {
                    this.obj = obj;
                    this.form.setValue(this.obj);
                    this.esNuevo =  false;
                });
        } else {
            this.obj = new TipoImpuesto();
            this.form.setValue(new TipoImpuesto());
            this.form.controls["codigo"].setValidators(Validators.minLength(2));
            this.esNuevo =  true;
        }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Methods
  goToList(obj: TipoImpuesto = null) {
    this.close.emit(obj);
    window.history.back();
  }

  save(){
    console .log( 'this.form.value: ' + Object.values(this.form.value) );

    this.service.save( this.form.value, this.esNuevo )
    .then(obj => {
      this.obj = obj;
      this.goToList(obj);
    })
    .catch(error => this.error = error);
  }

  errors(data: FormControl){
    /*data = data + " xxxxx";
    return data;*/
    let resp = '';
    let error: any;
    for (error in data.errors){
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
