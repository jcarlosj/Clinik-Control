// Imports del core de Angular 2 necesarios para este componente
import { Injectable } from '@angular/core';

// Class
export class cTipoFP {

  // Constructor
  constructor( public tipo        : number,
               public descripcion : string,
               public disponible  : boolean
  ) {

  }
}
