// Imports del core de Angular 2 necesarios para este componente
import { Component,
         EventEmitter,
         Input,
         OnInit,
         OnDestroy,
         Output }              from '@angular/core';
import { Router,
         ActivatedRoute }      from '@angular/router';
import { FormControl,
         FormGroup,
         Validators }          from '@angular/forms';
/*import { REACTIVE_FORM_DIRECTIVES,
         FORM_DIRECTIVES }     from '@angular/forms';*/
import {ReactiveFormsModule} from '@angular/forms';
import { Location }            from '@angular/common';

// Imports personalizados necesarios para este componente
import { TablaGeneralService } from './tabla-general.service';
import { TablaGeneral }        from './tabla-general';
import { cTipoTabla }          from '../_tipos/c-tipo-tabla';
import { cEstado }             from '../_tipos/cEstado';

// Decorator
@Component({
  selector    : 'frm-forma-pago',
  templateUrl : '../app/tablas-generales/tabla-general-detail.component.html',
  //directives  : [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES],
})

// Class
export class TablaGeneralDetail implements OnInit, OnDestroy {
  // Atributes
  @Output() close = new EventEmitter();
  private form        : FormGroup;
  private obj         : TablaGeneral;
  private error       : any;
  private sub         : any;
  private codigo      : string;
  private esNuevo     : boolean = false;
  //private tiposTablas : cTipoTabla[];
  private estado      : cEstado[];
  private router_     : Router;

  private title       : string;
  private path        : string;

  // Constructor
  constructor(
    private location: Location,
    private service: TablaGeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      // Definimos texto boton y titulo
  		this .title = '';

      //
  		this .path = this .router .url;
  		console .log( 'Validate Path: ' + this .path );

  		if( this .path == '/marca' ) {
  			this .title += 'Marca';
  		}
  		if( this .path == '/presentacion_medicamento' ) {
  			this .title += 'Presentación de medicamento';
  		}
  		if( this .path == '/vias_administracion' ) {
  			this .title += 'Vía de administración';
  		}
  		if( this .path == '/riesgo_procedimiento' ) {
  			this .title += 'Riesgo de procedimiento';
  		}

      // Inicializando atributos
      this.codigo = '';
      this.estado = [
          new cEstado( 'A', 'Activo' ),
          new cEstado( 'I', 'Inactivo' ),
      ];
    }

  // Implements de Angular 2
  ngOnInit() {

    this .form = new FormGroup({
        id                : new FormControl(),
        codigo            : new FormControl(),
        descripcion       : new FormControl(),
        estado            : new FormControl(),
        //tipo            : new FormControl(),
        editable          : new FormControl(),
        borrable          : new FormControl(),
        idUsuarioCrea     : new FormControl(),
        idUsuarioModifica : new FormControl(),
        fechaCreacion     : new FormControl(),
        fechaModificacion : new FormControl()
    });

    console .log ( 'router: ' + this.router);
    this.sub = this.route.params.subscribe(params => {
        /* ----------
          13-Ago-2016   -  Fernando Bermeo
      s    depurando en el navegador se puede observar que el parametro codigo es igual a la cadena
          "undefined", por eso se hacen las dos comparaciones
        ---------- */
        if (params['codigo'] !== undefined && params['codigo'] !== "undefined") {
            // Si el parametro codigo no esta definido entonces se trata de un nuevo registro
            this.esNuevo = false;
            this.codigo  = params['codigo'];
            this.service.getTablaGeneral(this.codigo)
                .then(obj => {
                    this.obj = obj;
                    this.form.setValue(this.obj);
                    this.esNuevo =  false;
                });
        } else {
            this.obj = new TablaGeneral();
            this.form.setValue(new TablaGeneral());
            this.form.controls["codigo"].setValidators(Validators.minLength(2));
            this.esNuevo =  true;
        }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Methods
  goToList(obj: TablaGeneral = null) {
    this.close.emit(obj);
    this .location .back();
  }

  save(){
    console .log( 'this .form .value :' + this.form.value );

    this.service
      .save( this.form.value, this.esNuevo )
      .then( obj => {
        this .obj = obj;
        this .goToList( obj );
      })
      .catch( error => this .error = error );
  }

  errors(obj: FormControl){
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
