import { Component }          from '@angular/core';

import './rxjs-extensions';

@Component({
  selector: 'my-menu',

  template: `
    <h1>{{title}} <small>{{description}}</small></h1>
    <nav>
      <a routerLink="/formas_pago" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Formas de Pago</a>
        <a routerLink="/productos" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{productos}}</a>
      <a routerLink="/marca" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{marcas}}</a>
      <!--a routerLink="/presentacion_medicamento" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{presentacionMedicamentos}}</a>
      <a routerLink="/vias_administracion" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{viasAdministracion}}</a>
      <a routerLink="/riesgo_procedimiento" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{riesgosProcedimiento}}</a>
      <a routerLink="/tipos_impuesto" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">{{tipoImpuestos}}</a>
        <a routerLink="/agrupacion" routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }">{{agrupacion}}</a-->
      
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css']
})
export class AppComponent {
  // Atributes
  private title = 'Clinik Control';
  private description = 'v0.1';
  private productos   = 'Productos';
  private formasPago                : string;
  private tablaGeneral              : string;
  private marcas                    : string;
  private presentacionMedicamentos  : string;
  private viasAdministracion        : string;
  private riesgosProcedimiento      : string;
  private tipoImpuestos             : string;
  private agrupacion                : string;

  // Constructor
  public constructor() {
    this .formasPago               = 'Formas pago';
    this .tablaGeneral             = 'Tabla General';
    this .marcas                   = 'Marcas';
    this .presentacionMedicamentos = 'Presentación medicamentos';
    this .viasAdministracion       = 'Vías administración';
    this .riesgosProcedimiento     = 'Riesgos procedimiento';
    this .tipoImpuestos            = 'Tipos de Impuestos'
    this .agrupacion                = 'Agrupaciones'
  }
}

/*
template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/um" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Formas de Pago</a>
    </nav>
    <router-outlet></router-outlet>
  `
*/

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/