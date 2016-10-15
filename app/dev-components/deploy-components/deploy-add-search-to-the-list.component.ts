import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

//import { AutocompleteComponent } from '../../../components/autocomplete/autocomplete.component';
//import { AddSearchToTheListComponent } from '../../../components/add-search-to-the-list/add-search-to-the-list.component';
 
import { Path } from '../../paths';

@Component({
  moduleId    : module.id,
  selector    : 'deploy-add-search-to-the-list',
  templateUrl : 'deploy-add-search-to-the-list.component.html'
})
export class DeployAddSearchToTheListComponent implements OnInit, OnDestroy {

    
    private data = new Object();            // Para ENVIAR a AddSearchToTheListComponent

    private urlApi : string;
    private path   : string;
    private field  : string;
    private label  : string;

    private showFormProductos : boolean;

    private visibleAddSearchToTheList = false;

    //@ViewChild(AutocompleteComponent)       autocomplete        : AutocompleteComponent;
    //@ViewChild(AddSearchToTheListComponent) addSearchToTheList  : AddSearchToTheListComponent;

    constructor() {
        this .enviarAutoCompleteComponent();
    }  

    changeAutocomplete() {
        alert( 'PARENT: Has hecho un click desde el componente AutoComplete' );
            // (To debug)
            console .log( 
                '> RECIBE\n changeAutocomplete() \n [ \n' +
                '  - Object.keys( this .data ) \n' + Object.keys( this .data ) + '\n\n' + 
                '  - Object.values( this .data ) \n' + Object.values( this .data ) + '\n ] \n '
            );
    }

    ngOnInit() {
        console .log( 'ngOnInit()' );
    }
   
    ngOnDestroy() {
        console .log( 'ngOnDestroy()' );
    }

    paraElPapa( saludo ) {
        console .log( 'paraElPapa()' );
        console .log( '> PARENT >> ' + saludo );
    }

    blurX( saludando : Object ){
        alert( 'Hey Jude!' );
        console .log( 'blurX()' );

        if( saludando ) {
            /* --- 
                1. Enviar los datos a AddSearchToTheListComponent
            --- */

            // (To debug)
            console .log( 
                '> RECIBE\n blurX() \n [ \n' +
                '  - Object.keys( saludando ) \n' + Object.keys( saludando ) + '\n\n' + 
                '  - Object.values( saludando ) \n' + Object.values( saludando ) + '\n ] \n '
            );

            
            // Enviar los datos.
            this .enviarAddSearchToTheListComponent( saludando );
            // Mostrar el módulo "AddSearchToTheList""
            this .visibleAddSearchToTheList = true;




            this .showFormProductos = true;
        }
/*
        

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
        */
    }

    addList() {
        /* Limpia, deshabilita, y oculta el formulario */
        this .showFormProductos = false;
    }

    // Envia a AutoCompleteComponent
    enviarAutoCompleteComponent() {
        // Define valores por defecto
        this .urlApi = Path.Server.API;
        this .path   = '/productos';       // Representa el nombre de la tabla en la BD
        this .field  = 'descripcion1';
        this .label  = 'Producto:';

        // (To debug) 
        console .log( 
        '> ENVIA\n AutoCompleteComponent() \n [ \n' + 
        ' - urlApi : ' + this .urlApi + '\n' +
        ' - path   : ' + this .path + '\n' +
        ' - field  : ' + this .field + '\n' +
        ' - label  : ' + this .label +  '\n ] \n' 
        );
    }

    enviarAddSearchToTheListComponent( obj : Object ) {     
        // Agregamos el campo cantidad y sub-total
        obj[ 'sub_total' ] = 0;
        obj[ 'cantidad' ] = 0; 

        // Asignamos el valor que vamos a enviar a nuestro componente hijo  
        this .data = obj;
        
        // (To debug)
        
        console .log( 
            '> ENVIA\n enviarAddSearchToTheListComponent() \n [ \n' +
            '  - Object.keys( this .data .obj ) \n' + Object.keys( this .data ) + '\n\n' + 
            '  - Object.values( this .data .obj ) \n' + Object.values( this .data ) + '\n ] \n '
        );
    }
}