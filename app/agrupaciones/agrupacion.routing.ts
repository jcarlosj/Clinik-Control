//import { RouterConfig }         from '@angular/router';

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AgrupacionListComponent }    from './agrupacion-list.component';
import { AgrupacionDetailComponent }  from './agrupacion-detail.component';

export const AGRUPACION_ROUTES: Routes = [
  { path: 'agrupaciones',         component: AgrupacionListComponent },
  { path: 'agrupaciones/:codigo', component: AgrupacionDetailComponent }
];