import { Component } from '@angular/core';

import { Tercero } from '../terceros/tercero';

@Component({
  moduleId: module.id,
  selector: 'deploy',
  template: `
    <h2>Deploy Autocomplete</h2>
    <autocomplete (blur)="blurX( $event )" [tabla]="path" [campo]="field" [etiqueta]="label"></autocomplete>
    <button>Ok</button>
  `
})
export class DeployAutocompleteComponent {
  private path:string;
  private field:string;
  private label:string;
  
  constructor() {
    this .path = '/productos';       // Representa el nombre de la tabla en la BD
    this .field = 'descripcion1';
    this .label = 'Producto:';
    console .log( '> PARENT (DeployAutocompleteComponent) path: ' + this.path );
  }

  blurX(saludando:Object){
    
    if( typeof saludando == 'Object' ) {
      console .log( 'Entonces este es un objeto de tipo: ' + typeof saludando );
    } 
    else {
      
    }
        console.log( '> ' + Object.keys(saludando) + ' '+ Object.values(saludando ) );
  }
}