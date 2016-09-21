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
	private selectedObj	: TablaGeneral;
	private selectedId					: string;
	private sub					: any;
	private error				: any;
	private path 				: string;

	private title       = 'Listado de ';
	private botonBorrar = 'Borrar';
	private botonNuevo  = 'Nuev';

	// Constructor
	constructor(
		private service: TablaGeneralService,
    private route: ActivatedRoute,
    private router: Router
	) {

		this .path = this .router .url;
		console .log( 'Validate Path: ' + this .path );

		if( this .path == '/marca' ) {
			this .title += 'Marcas';
			this .botonNuevo += 'a marca';
		}
		if( this .path == '/presentacion_medicamento' ) {
			this .title += 'Presentación de medicamentos';
			this .botonNuevo += 'a presentación de medicamento';
		}
		if( this .path == '/vias_administracion' ) {
			this .title += 'Vías de administración';
			this .botonNuevo += 'a vía de administración';
		}
		if( this .path == '/riesgo_procedimiento' ) {
			this .title += 'Riesgos de procedimiento';
			this .botonNuevo += 'o riesgo de procedimiento';
		}
		if( this .path == '/unidades_medida' ) {
			this .title += 'Unidades de medida';
			this .botonNuevo += 'a vía de administración';
		}

	}

  // Implements de Angular 2
	ngOnInit() {

  	this.sub = this.route
    	.params
    	.subscribe(params => {
      	this.selectedId = params['codigo'];
      	this.service.getTablasGenerales( this .path ) .then(arrObj => this.arrObj = arrObj);
		});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	// Methods
  isSelected(obj: TablaGeneral) { 
		return obj.codigo === this.selectedId; 
	}

  onSelect(obj: TablaGeneral) {
    this.router.navigate([ this .path, obj.codigo ]);
  }

  add(){
	  this.router.navigate([ this .path, this .selectedObj ]);
		console .log( 'Creando nuevo registro' );
  }

	delete(arrObj: TablaGeneral, event: any) {
    event.stopPropagation();

    this.service
        .delete(arrObj)
        .then(res => {
          this.arrObj = this.arrObj.filter(h => h !== arrObj);
         
				 if ( this.selectedObj === arrObj ) { 
					 this.selectedObj = null; 
					}
        })
        .catch(error => this.error = error);
  }

}
