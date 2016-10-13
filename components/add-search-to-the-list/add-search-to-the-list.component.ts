import { Component } from '@angular/core';

import { Path } from '../../app/paths';

@Component({
  moduleId    : module.id,
  selector    : 'add-search-to-the-list',
  templateUrl : 'add-search-to-the-list.component.html',
  styleUrls   : [ 'add-search-to-the-list.component.css' ]
})
export class AddSearchToTheListComponent {

  private urlApi:string;
  private path:string;
  private field:string;
  private label:string;
  private showFormProductos : boolean = false;
  private fieldsForm :any;
  
  
  constructor() {
    this .urlApi = Path.Server.API;
    this .path = '/productos';       // Representa el nombre de la tabla en la BD
    this .field = 'descripcion1';
    this .label = 'Producto:';
    console .log( 
      '> PARENT (DeployAutocompleteComponent)\n' + 
      ' - urlApi : ' + this .urlApi + '\n' +
      ' - path   : ' + this .path + '\n' +
      ' - field  : ' + this .field + '\n' +
      ' - label  : ' + this .label +  '\n' 
    );

    // Configuración de campos que se van a generar automáticamente usando un Array de Objetos JSON 
    this .fieldsForm = [
      {
        label    : 'Código',
        name     : 'codigo',
        id       : 'codigo',
        class    : '_codigo',
      },
      {
        label    : 'Descripción',
        name     : 'descripcion',
        id       : 'descripcion',
        class    : '_descripcion',
      },
      {
        label    : 'Valor unitario',
        name     : 'valor_unitario',
        id       : 'valor-unitario',
        class    : '_valor-unitario',
      },
      {
        label    : 'Marca',
        name     : 'marca',
        id       : 'marca',
        class    : '_marca',
      },
      {
        label    : 'Valor unitario',
        name     : 'valor_unitario',
        id       : 'valor-unitario',
        class    : '_valor-unitario',
      },
      {
        label    : 'Existencia',
        name     : 'existencia',
        id       : 'existencia',
        class    : '_existencia',
      },
      ,
      {
        label    : 'Cantidad',
        name     : 'cantidad',
        id       : 'cantidad',
        class    : '_cantidad',
      }
    ];
  }

  blurX( saludando : Object ){
    
    this .showFormProductos = true;

    console.log( '> HOLA >>> ' + Object.keys( saludando ) + ' ' + Object.values( saludando ) );
    for( let campo in saludando ) {
      console.log( ' - ' + campo + '\n' );
    } 

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
  }

}

/* ---
    Herencia: Creamos dos clases para evitar el conficto que nos genera  
    llamar la misma clase (ó Componente) en dos lugares donde es requerida 
   ---  */
export class AddSearchToTheListComponentByComponent extends AddSearchToTheListComponent {}
export class AddSearchToTheListComponentByModule extends AddSearchToTheListComponent {}