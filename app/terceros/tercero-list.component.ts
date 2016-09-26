// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Imports personalizados necesarios para este componente
import { Path }             from '../paths';
import { TerceroService }   from './tercero.service';
import { Tercero }          from './tercero';

// Decorator
@Component({
	moduleId    : module.id,
	selector		: 'tercero-list',
	templateUrl : 'tercero-list.component.html',
})

// Clase principal para este componente
export class TerceroListComponent implements OnInit, OnDestroy {
	
	// Atributes
	private arrObj      : Tercero[];
	private selectedObj : Tercero;
	private selectedId  : string;
	private sub 				: any;
	private error 			: any;
	private path 				: string;

	private title       = 'Listado de terceros';
	private botonBorrar = 'Borrar';
	private botonNuevo  = 'Nuevo tercero';

	// Constructor
	constructor(
		private service: TerceroService,
		private route: ActivatedRoute,
		private router: Router
	) { 
		// Capturamos el PATH actual.
		this .path = this .router .url;
		console .log( 'Validate Path: ' + this .path );
	}

	// Implements de Angular 2
	ngOnInit() {
			this.sub = this .route
											.params
											.subscribe( params => {
													this.selectedId = params['codigo'];
													this.service.getRecords( this .path )
        											.then( obj => this.arrObj = obj );
											});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	// Methods
  isSelected( obj: Tercero ) { 
		return obj.codigo === this.selectedId; 
	}

  onSelect( obj: Tercero ) {
    this .router .navigate( [ this .path, obj.codigo ] );
  }
  add(){
	  this .router .navigate([ this .path, this.selectedObj ]);
  }

	delete( arrObj: Tercero, event: any ) {
    event.stopPropagation();
		 
    this .service .delete( arrObj )
                  .then( res => {
          						this .arrObj = this .arrObj .filter( h => h !== arrObj );
          						
											if ( this.selectedObj === arrObj ) { 
												this.selectedObj = null; 
											}
        					})
        .catch( error => this.error = error );
  }
}