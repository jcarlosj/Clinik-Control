// Imports del core de Angular 2 necesarios para este componente
//import { RouterConfig }              from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { AgrupacionListComponent }   from './agrupacion-list.component';
import { AgrupacionDetailComponent } from './agrupacion-detail.component';

// Constante con los PATHs del componente
export const AGRUPACION_ROUTES: Routes = [
  { path: 'agrupacion'          , component: AgrupacionListComponent },
  { path: 'agrupacion/:codigo'  , component: AgrupacionDetailComponent }
];
