import { Component } from '@angular/core';

import { Tercero } from '../terceros/tercero';

@Component({
  moduleId: module.id,
  selector: 'deploy',
  template: `
    <h2>Deploy Autocomplete</h2>
    <autocomplete (blur)="blurX( $event )" [tabla]="path"></autocomplete>
    <button>Ok</button>
  `
})
export class DeployAutocompleteComponent {
  private path:string;
  
  constructor() {
    this .path = '/terceros';
    console .log( '> PARENT (DeployAutocompleteComponent) path: ' + this.path );
  }

  blurX(saludando:Tercero){
    
    if( typeof saludando == 'Tercero' ) {
      console .log( 'Entonces este es un objeto de tipo: ' + typeof saludando );
    } 
    else {
      
    }
    
        console.log( '> ' + Object.keys(saludando) + ' '+ Object.values(saludando ) );
  }
}