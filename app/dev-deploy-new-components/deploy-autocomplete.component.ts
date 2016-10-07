import { Component } from '@angular/core';

import { Tercero } from '../terceros/tercero';
import { Path } from '../paths';

@Component({
  moduleId: module.id,
  selector: 'deploy',
  template: `
    <h2>Deploy Autocomplete</h2>
    <autocomplete (blur)="blurX( $event )" [urlApi]="urlApi" [tabla]="path" [campo]="field" [etiqueta]="label"></autocomplete>
    <button>Ok</button>
  `
})
export class DeployAutocompleteComponent {
  private urlApi:string;
  private path:string;
  private field:string;
  private label:string;
  
  
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
  }

  blurX(saludando:Object){
    
    if( typeof saludando == 'Object' ) {
      console .log( 'Entonces este es un objeto de tipo: ' + typeof saludando );
    } 
    else {
      
    }
        console.log( '> ' + Object.keys(saludando) + ' '+ Object.values( saludando ) );
        for( let campo in saludando ) {
          console.log( ' - ' + campo + '\n' );
        }
  }
}