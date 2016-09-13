// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } 			from '@angular/router';

// Imports personalizados necesarios para este componente
import { AgrupacionService }  from './agrupacion.service';
import { Agrupacion } 				from './agrupacion';

// Decorator
@Component({
	templateUrl: '../app/agrupaciones/agrupacion-list.component.html',
})

// Class
export class AgrupacionListComponent implements OnInit, OnDestroy {

	// Atributes
	private arrObj: Agrupacion[];
	private obj: Agrupacion;
	private error: any;
	private id: string;
	private sub: any;

	private title: string;
	private path : string;
	private botonNuevo : string;

	// Constructor
	constructor(
		private service : AgrupacionService,
  	private route		: ActivatedRoute,
  	private router	: Router
	) {
		// Definimos texto boton y titulo
		this .title = 'Listado de agrupaciones.';
		this .botonNuevo = 'Nueva agrupación';

		// Obtenemos el path actual
		this .path = this .router .url;
		console .log( 'Validate Path: ' + this .path );
	}

	// Implements de Angular 2
	ngOnInit() {
    	this.sub = this.route
      	.params
      	.subscribe(params => {
        	this.id = params['codigo'];
        	this.service.getRecords( this .path )
        	.then(obj => this.arrObj = obj);
		});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isSelected(obj: Agrupacion) { return obj.codigo === this.id; }

  onSelect(obj: Agrupacion) {
    this.router.navigate([ this .path, obj.codigo ]);
  }
  add(){
	  let obj: Agrupacion;
		this.obj = new Agrupacion();
	  this.router.navigate(['/agrupacion', obj]);
		console .log( 'Creando nuevo registro' );
  }


	delete(obj: Agrupacion, event: any) {
    event.stopPropagation();

    this.service
        .delete(obj)
        .then(res => {
          this.arrObj = this.arrObj.filter(h => h !== obj);
          if (this.obj === obj) { this.obj = null; }
        })
        .catch(error => this.error = error);
  }

}
