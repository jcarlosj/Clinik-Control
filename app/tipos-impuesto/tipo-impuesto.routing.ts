//import { RouterConfig }         from '@angular/router';

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TipoImpuestoListComponent }    from './tipo-impuesto-list.component';
import { TipoImpuestoDetailComponent }  from './tipo-impuesto-detail.component';

export const TIPOS_IMPUESTO_ROUTER: Routes = [
  { path: 'tipos_impuesto',         component: TipoImpuestoListComponent },
  { path: 'tipos_impuesto/:codigo', component: TipoImpuestoDetailComponent }
];