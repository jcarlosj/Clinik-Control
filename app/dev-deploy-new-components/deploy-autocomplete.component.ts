import { Component } from '@angular/core';

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

  blurX(saludando:Object){
        console.log( '> ' + Object.keys(saludando[0]) + ' '+ Object.values(saludando[0] ) );
  }
}