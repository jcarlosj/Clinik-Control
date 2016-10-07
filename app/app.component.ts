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

  private menu                  : any;
  private menu_tablas_generales : any;
  private menu_documentos       : any;
  private menu_dev       : any;

  // Constructor
  public constructor( ) {
    this .menu = [
      { path: '/formas_pago',              nameItem: 'Formas de pago' },
      { path: '/tipos_impuesto',           nameItem: 'Tipos de impuesto' },
      { path: '/agrupaciones',             nameItem: 'Agrupaciones' },
      { path: '/productos',                nameItem: 'Productos' },
      { path: '/terceros',                 nameItem: 'Terceros' },
    ];  
      /* Tablas generales */
    this .menu_tablas_generales = [  
      { path: '/marca',                    nameItem: 'Marcas' },
      { path: '/presentacion_medicamento', nameItem: 'Presentación de medicamentos' },
      { path: '/vias_administracion',      nameItem: 'Vías de administración' },
      { path: '/riesgo_procedimiento',     nameItem: 'Riesgos procedimiento' },
      { path: '/unidades_medida',          nameItem: 'Unidades de medida' },
      { path: '/zonas',                    nameItem: 'Zonas' },
      { path: '/profesiones',              nameItem: 'Profesiones' },
      { path: '/eps',                      nameItem: 'EPS' },
    ];  
      /* Documentos */
    this .menu_documentos = [ 
      { path: '/entradas',                 nameItem: 'Entradas' },
      { path: '/salidas',                  nameItem: 'Salidas' },
      { path: '/compras',                  nameItem: 'Compras' },
      { path: '/ventas',                   nameItem: 'Ventas' },
    ];  
      /* Devs: Desarrollo de componentes, ejemplos, pruebas, testing */
    this .menu_dev = [ 
      { path: '/padre-1',                  nameItem: 'Padre 1' },
      { path: '/padre-2',                  nameItem: 'Padre 2' },
      { path: '/padre-3',                  nameItem: 'Padre 3' },
      { path: '/padre-4',                  nameItem: 'Padre 4' },
      { path: '/fdo-examples',             nameItem: 'Fdo (Ejemplos)' },
      { path: '/deploy',                   nameItem: 'Deploy' }
    ];
    
  }
}