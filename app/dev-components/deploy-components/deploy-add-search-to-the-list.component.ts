import { Component, OnInit, OnDestroy } from '@angular/core';

import { Path } from '../../paths';

@Component({
  moduleId    : module.id,
  selector    : 'deploy-add-search-to-the-list',
  templateUrl : 'deploy-add-search-to-the-list.component.html'
})
export class DeployAddSearchToTheListComponent implements OnInit, OnDestroy {

    
    private data: any[];            // Para ENVIAR a AddSearchToTheListComponent

    private urlApi : string;
    private path   : string;
    private field  : string;
    private label  : string;

    private showFormProductos : boolean;

    private visibleAddSearchToTheList = false;

    constructor() {
        this .enviarAutoCompleteComponent();
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
        // Define valores por defecto
        //this .data .push( obj );
        
        this .data = [
            { label: 'Código'          , name: 'codigo' },
            { label: 'Descripción'     , name: 'descripcion' },
            { label: 'Valor unitario'  , name: 'valor_unitario' },
            { label: 'Marca'           , name: 'marca' },
            { label: 'Unidad de medida', name: 'unidad_medida' },
            { label: 'Existencia'      , name: 'existencia' },
            { label: 'Cantidad '       , name: 'cantidad' }
        ];

        // (To debug)
        /*
        console .log( 
            '> ENVIA\n enviarAddSearchToTheListComponent() \n [ \n' +
            '  - Object.keys( this .data[0] .obj ) \n' + Object.keys( this .data[0] .obj  ) + '\n\n' + 
            '  - Object.values( this .data[0] .obj ) \n' + Object.values( this .data[0] .obj ) + '\n ] \n '
        );*/
    }
}