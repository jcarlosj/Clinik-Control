import { Component }          from '@angular/core';

import './rxjs-extensions';

@Component({
  moduleId    : module.id,
  selector    : 'my-menu',
  templateUrl : 'app.component.html',
  styleUrls   : ['app.component.css']
})
export class AppComponent {

  // Atributes
  private title       : string = 'Clinik Control';
  private urlTitle    : string = '/';
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
      { path: '/productos',                nameItem: 'Productos' },
      { path: '/terceros',                 nameItem: 'Terceros' },
      { path: '/entradas',                 nameItem: 'Entradas' },
      { path: '/salidas',                  nameItem: 'Salidas' },
      { path: '/compras',                  nameItem: 'Compras' },
      { path: '/ventas',                   nameItem: 'Ventas' },
      { path: '/padre-1',                  nameItem: 'Padre 1' },
      { path: '/padre-2',                  nameItem: 'Padre 2' },
      { path: '/padre-3',                  nameItem: 'Padre 3' },
      { path: '/padre-4',                  nameItem: 'Padre 4' }
    ];
    
  }
}