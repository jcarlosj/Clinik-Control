// Imports del core de Angular 2 necesarios para este componente
import { Injectable } from '@angular/core';

// Class
export class cTipoTabla {

  // Atributes
  private id          : number;
  private codigo      : string;
  private descripcion : string;
  private disponible  : boolean;

  // Constructor
  constructor(
    id          : number,
    codigo      : string,
    descripcion : string,
    disponible  : boolean
  ) {
    this .id          = id;
    this .codigo      = codigo;
    this .descripcion = descripcion;
    this .disponible  = disponible;
    }
}
