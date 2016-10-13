import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Path } from '../../app/paths';

@Component({
  moduleId    : module.id,
  selector    : 'add-search-to-the-list',
  templateUrl : 'add-search-to-the-list.component.html',
  styleUrls   : [ 'add-search-to-the-list.component.css' ]
})
export class AddSearchToTheListComponent implements OnInit, OnDestroy {

  private urlApi:string;
  private path:string;
  private field:string;
  private label:string;
  private showFormProductos : boolean = false;
  private fields_form : any = [] ;

  @Input() private data:any[] = [];
  @Output() dad = new EventEmitter();
  
  constructor() {

    this .urlApi = Path.Server.API;
    this .path   = '/productos';       // Representa el nombre de la tabla en la BD
    this .field  = 'descripcion1';
    this .label  = 'Producto:';

    console .log( 
      '> PARENT (DeployAutocompleteComponent)\n' + 
      ' - urlApi : ' + this .urlApi + '\n' +
      ' - path   : ' + this .path + '\n' +
      ' - field  : ' + this .field + '\n' +
      ' - label  : ' + this .label +  '\n' 
    );

  }  

  ngOnInit() {

  }
   
  ngOnDestroy() {

  }

  blurX( saludando : Object ){
    
    this .showFormProductos = true;

    if ( this .showFormProductos ) {
      console .log( 'Muestra el formulario con los campos de busqueda diligenciados' );
      return true;
    }

    console .log( 'NO muestra formulario ni resultados' );
    return false;
  }

  addList() {
    /* Limpia, deshabilita, y oculta el formulario */
    this .showFormProductos = false;

    // Envia al padre
    this.dad.emit( 'Hola papa' );
  }

}

/* ---
    Herencia: Creamos dos clases para evitar el conficto que nos genera  
    llamar la misma clase (ó Componente) en dos lugares donde es requerida 
   ---  */
export class AddSearchToTheListComponentByComponent extends AddSearchToTheListComponent {}
export class AddSearchToTheListComponentByModule extends AddSearchToTheListComponent {}