// Imports del core de Angular 2 necesarios para este componente
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { ProductoListComponent }    from './producto-list.component';
import { ProductoDetailComponent }  from './producto-detail.component';

// Constante con los PATHs del componente
export const PRODUCTOS_ROUTER: Routes = [
  { path: 'productos',  component: ProductoListComponent },
  { path: 'productos/:codigo', component: ProductoDetailComponent }
];