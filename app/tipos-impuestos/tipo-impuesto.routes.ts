// Imports del core de Angular 2 necesarios para este componente
//import { RouterConfig }              from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { TipoImpuestoListComponent }    from './tipo-impuesto-list.component';
import { TipoImpuestoDetailComponent }  from './tipo-impuesto-detail.component';

// Exportación de las rutas disponibles para el módulo
export const tipoImpuestoRoutes: Routes = [
  { path: 'tipos_impuesto',          component: TipoImpuestoListComponent },
  { path: 'tipos_impuesto/:codigo',  component: TipoImpuestoDetailComponent }
];
