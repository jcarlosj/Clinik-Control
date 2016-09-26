// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Imports personalizados necesarios para este componente
import { Path }              from '../paths';
import { TipoImpuestoService }  from './tipo-impuesto.service';
import { TipoImpuesto }         from './tipo-impuesto';

// Decorator
@Component({
  moduleId    : module.id,
  selector    : 'tipo-impuesto-list',
	templateUrl : 'tipo-impuesto-list.component.html',
})

// Clase principal para este componente
export class TipoImpuestoListComponent implements OnInit, OnDestroy {
	
	// Atributes
	private arrObj      : TipoImpuesto[];
	private selectedObj : TipoImpuesto;
	private selectedId  : string;
	private sub 				: any;
	private error 			: any;
	private path 				: string;

	private title       = 'Listado tipos de impuesto';
	private botonBorrar = 'Borrar';
	private botonNuevo  = 'Nueva tipo de impuesto';

	// Constructor
	constructor(
		private service: TipoImpuestoService,
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
  isSelected( obj: TipoImpuesto ) { 
		return obj.codigo === this.selectedId; 
	}

  onSelect( obj: TipoImpuesto ) {
    this .router .navigate( [ this .path, obj.codigo ] );
  }
  add(){
	  this .router .navigate([ this .path, this.selectedObj ]);
  }

	delete( arrObj: TipoImpuesto, event: any ) {
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