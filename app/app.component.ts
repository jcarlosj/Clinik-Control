import { Component }          from '@angular/core';

import './rxjs-extensions';

@Component({
  selector    : 'my-menu',
  templateUrl : 'app/app.component.html',
  styleUrls   : ['app/app.component.css']
})
export class AppComponent {

  // Atributes
  private title       : string = 'Clinik Control';
  private description : string = 'v0.2';
  private menu        : any;

  // Constructor
  public constructor( ) {
    this .menu = [
      { path: '/formas_pago',              nameItem: 'Formas de pago' },
      { path: '/marca',                    nameItem: 'Marcas' },
      { path: '/presentacion_medicamento', nameItem: 'Presentación de medicamentos' },
      { path: '/vias_administracion',      nameItem: 'Vías de administración' },
      { path: '/riesgo_procedimiento',     nameItem: 'Riesgos procedimiento' },
      { path: '/unidades_medida',          nameItem: 'Unidades de medida' },
      { path: '/tipos_impuesto',           nameItem: 'Tipos de impuesto' },
      { path: '/agrupaciones',             nameItem: 'Agrupaciones' },
      { path: '/productos',                nameItem: 'Productos' }
    ];
    
  }
}