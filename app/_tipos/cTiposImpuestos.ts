// Imports del core de Angular 2 necesarios para este componente
import { Injectable } from '@angular/core';

// Class
export class cTiposImpuestos {

  // Constructor
  constructor( public tipo        : string,
               public descripcion : string,
               public disponible  : boolean
  ) {

  }
}
