// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Imports personalizados necesarios para este componente
import { ProductoService }   from './producto.service';
import { Producto } from './producto';

// Decorator
@Component({
	templateUrl: '../app/formas-pago/forma-pago-list.component.html',
})

// Clase principal para este componente
export class ProductoListComponent implements OnInit, OnDestroy {
	
	// Atributes
	private arrObj      : Producto[];
	private selectedObj : Producto;
	private selectedId  : string;
	private sub 				: any;
	private error 			: any;
	private path 				: string;

	private title       = 'Listado de productos';
	private botonBorrar = 'Borrar';
	private botonNuevo  = 'Nuevo producto';

	// Constructor
	constructor(
		private service: ProductoService,
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
  isSelected( obj: Producto ) { 
		return obj.codigo === this.selectedId; 
	}

  onSelect( obj: Producto ) {
    this .router .navigate( [ this .path, obj.codigo ] );
  }
  add(){
	  this .router .navigate([ this .path, this.selectedObj ]);
  }

	delete( arrObj: Producto, event: any ) {
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