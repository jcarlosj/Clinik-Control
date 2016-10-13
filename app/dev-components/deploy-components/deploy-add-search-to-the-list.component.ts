import { Component } from '@angular/core';

import { Path } from '../../paths';

@Component({
  moduleId    : module.id,
  selector    : 'deploy-add-search-to-the-list',
  templateUrl : 'deploy-add-search-to-the-list.component.html'
})
export class DeployAddSearchToTheListComponent {

    private data: any[] = [
        { label: 'Código'          , name: 'codigo' },
        { label: 'Descripción'     , name: 'descripcion' },
        { label: 'Valor unitario'  , name: 'valor_unitario' },
        { label: 'Marca'           , name: 'marca' },
        { label: 'Unidad de medida', name: 'unidad_medida' },
        { label: 'Existencia'      , name: 'existencia' },
        { label: 'Cantidad '       , name: 'cantidad' }
    ];

    constructor() { }
/*
    blurX( saludando:Object ){
        
    }
*/
}