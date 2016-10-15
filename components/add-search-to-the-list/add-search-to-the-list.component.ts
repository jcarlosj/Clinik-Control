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

  @Input() private data = new Object();
  @Output() dad = new EventEmitter();
  
  
  constructor() {
    console .log( 'constructor()' );


  }  

  ngOnInit() {
    console .log( 'ngOnInit()' );
                /* --- 
                1. Desplegamos los datos.
                2. Mostramos el formulario.
                3. Valida el campo Cantidad.
                4. Activa el boton de AGREGAR.
               --- */
    if ( this .data == null || this .data == undefined ) {
      console .log( '=> Msg: El objeto esta definido.' );
    }
    else {
      console .log( '=> Msg: El objeto NO esta definido.' );
    
    }               
  }
   
  ngOnDestroy() {
    console .log( 'ngOnDestroy()' );
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
    alert( 'HEY! Daddy soy tu hijo! \nAddSearchToTheListComponent ');

    // (To debug)
    console .log( 
        '> RECIBE\n addList() \n [ \n' +
        '  - Object.keys( this.data ) \n' + Object.keys( this .data ) + '\n\n' + 
        '  - Object.values( this.data ) \n' + Object.values( this .data ) + '\n ] \n '
    );
  }

}

/* ---
    Herencia: Creamos dos clases para evitar el conficto que nos genera  
    llamar la misma clase (ó Componente) en dos lugares donde es requerida 
   ---  */
export class AddSearchToTheListComponentByComponent extends AddSearchToTheListComponent {}
export class AddSearchToTheListComponentByModule extends AddSearchToTheListComponent {}