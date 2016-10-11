// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } 			from '@angular/router';

// Imports personalizados necesarios para este componente
import { Path } 								from '../paths';
import { DocumentoService }  from './documento.service';
import { Documento } 				from './documento';

// Decorator
@Component({
	moduleId    : module.id,
	selector    : 'documentos-list',
	templateUrl : 'documento-list.component.html',
})

// Class
export class DocumentoList implements OnInit, OnDestroy {

	// Atributes
	private arrObj			: Documento[];
	private selectedObj	: Documento;
	private selectedId	: string;
	private sub					: any;
	private error				: any;
	private path 				: string;

	private title       = 'Listado de ';
	private botonBorrar = 'Borrar';
	private botonNuevo  = 'Nuev';

	// Constructor
	constructor(
		private service: DocumentoService,
    private route: ActivatedRoute,
    private router: Router
	) {

		this .path = this .router .url;
		console .log( 'Validate Path: ' + this .path );

		if( this .path == '/entradas' || this .path == '/salidas'  ) {


			if( this .path == '/entradas' ) {
				this .title += 'Entradas';
				this .botonNuevo += 'a entrada';
			}
			if( this .path == '/salidas' ) {
				this .title += 'Salidas';
				this .botonNuevo += 'a salida';
			}

		}
		if( this .path == '/compras' || this .path == '/ventas'  ) {
			

			if( this .path == '/compras' ) {
				this .title += 'Compras';
				this .botonNuevo += 'a compra';
			}
			if( this .path == '/ventas' ) {
				this .title += 'Ventas';
				this .botonNuevo += 'a venta';
			}

		}

	}

  // Implements de Angular 2
	ngOnInit() {

  	this.sub = this.route
    	.params
    	.subscribe(params => {
      	this.selectedId = params['codigo'];
      	this.service.getRecords( this .path ) 
				    .then( arrObj => { 
							this.arrObj = arrObj;
							arrObj.forEach(element => {
								if( this .path == '/entradas' || this .path == '/salidas'  ) {
									element .desc_tmp = element .concepto.toString();
									console .log( ' => arrObj[].concepto: ' + element.concepto + '\n => arrObj[].desc_tmp: ' + element.desc_tmp );
								}
								if( this .path == '/compras' || this .path == '/ventas'  ) {
									element .desc_tmp = element .tercero.toString();
									console .log( ' => arrObj[].tercero: ' + element.tercero + '\n => arrObj[].desc_tmp: ' + element.desc_tmp );
								}
							}); 
						});
		});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	// Methods
  isSelected(obj: Documento) { 
		return obj.codigo === this.selectedId; 
	}

  onSelect(obj: Documento) {
    this.router.navigate([ this .path, obj.codigo ]);
  }

  add(){
	  this.router.navigate([ this .path, this .selectedObj ]);
		console .log( 'Creando nuevo registro' );
  }

	delete(arrObj: Documento, event: any) {
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
