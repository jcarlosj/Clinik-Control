import { Component, OnInit, OnDestroy } from '@angular/core';

import { Path } from '../../paths';

@Component({
  moduleId    : module.id,
  selector    : 'deploy-add-search-to-the-list',
  templateUrl : 'deploy-add-search-to-the-list.component.html'
})
export class DeployAddSearchToTheListComponent implements OnInit, OnDestroy {

    private data: any[] = [
        { label: 'Código'          , name: 'codigo' },
        { label: 'Descripción'     , name: 'descripcion' },
        { label: 'Valor unitario'  , name: 'valor_unitario' },
        { label: 'Marca'           , name: 'marca' },
        { label: 'Unidad de medida', name: 'unidad_medida' },
        { label: 'Existencia'      , name: 'existencia' },
        { label: 'Cantidad '       , name: 'cantidad' }
    ];

    private urlApi : string;
    private path   : string;
    private field  : string;
    private label  : string;

    private showFormProductos : boolean;

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
        alert( 'Hola' );
    }
   
    ngOnDestroy() {

    }

    paraElPapa( saludo ) {
        console .log( '> PARENT >> ' + saludo );
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




/*
    blurX( saludando:Object ){
        
    }
*/
}