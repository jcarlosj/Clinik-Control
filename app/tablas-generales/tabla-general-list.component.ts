// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } 			from '@angular/router';

// Imports personalizados necesarios para este componente
import { Path } 								from '../paths';
import { TablaGeneralService }  from './tabla-general.service';
import { TablaGeneral } 				from './tabla-general';

// Decorator
@Component({
	templateUrl: Path.Server.TEMPLATE + 'tablas-generales/tabla-general-list.component.html',
})

// Class
export class TablaGeneralList implements OnInit, OnDestroy {

	// Atributes
	private arrObj			: TablaGeneral[];
	private obj					: TablaGeneral;
	private error				: any;
	private id					: string;
	private sub					: any;

	private title				: string;
	private path 				: string;
	private botonNuevo 	: string;

	// Constructor
	constructor(
		private service: TablaGeneralService,
    private route: ActivatedRoute,
    private router: Router
	) {
		// Definimos texto boton y titulo
		this .title = 'Listado de ';
		this .botonNuevo = 'Nuev';

		this .path = this .router .url;
		console .log( 'Validate Path: ' + this .path );

		if( this .path == '/marca' ) {
			this .title += 'marcas';
			this .botonNuevo += 'a marca';
		}
		if( this .path == '/presentacion_medicamento' ) {
			this .title += 'presentación medicamentos';
			this .botonNuevo += 'a presentación de medicamento';
		}
		if( this .path == '/vias_administracion' ) {
			this .title += 'vías administración';
			this .botonNuevo += 'a vía de administración';
		}
		if( this .path == '/riesgo_procedimiento' ) {
			this .title += 'riesgos procedimiento';
			this .botonNuevo += 'o riesgo de procedimiento';
		}

	}

  // Implements de Angular 2
	ngOnInit() {

  	this.sub = this.route
    	.params
    	.subscribe(params => {
      	this.id = params['codigo'];
      	this.service.getTablasGenerales( this .path ) .then(arrObj => this.arrObj = arrObj);
		});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	// Methods
  isSelected(obj: TablaGeneral) { return obj.codigo === this.id; }

  onSelect(obj: TablaGeneral) {
    this.router.navigate([ this .path, obj.codigo ]);
  }

  add(){
	  let obj : TablaGeneral;
		this.obj   = new TablaGeneral();
	  this.router.navigate([ this .path, obj ]);
		console .log( 'Creando nuevo registro' );
  }

	delete(arrObj: TablaGeneral, event: any) {
    event.stopPropagation();

    this.service
        .delete(arrObj)
        .then(res => {
          this.arrObj = this.arrObj.filter(h => h !== arrObj);
          if (this.obj === arrObj) { this.obj = null; }
        })
        .catch(error => this.error = error);
  }

}
