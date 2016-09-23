// Imports del core de Angular 2 necesarios para este componente
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { TerceroListComponent }    from './tercero-list.component';
import { TerceroDetailComponent }  from './tercero-detail.component';

// Constante con los PATHs del componente
export const TERCEROS_ROUTER: Routes = [
  { path: 'terceros',         component: TerceroListComponent },
  { path: 'terceros/:codigo', component: TerceroDetailComponent }
];