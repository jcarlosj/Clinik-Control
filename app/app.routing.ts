import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }    from './app.component';

import { FORMAS_PAGO_ROUTER }    from './formas-pago/formas-pago.routing';
import { TABLA_GENERAL_ROUTES } from './tablas-generales/tabla-general.routes';
import { AGRUPACION_ROUTES }    from './agrupaciones/agrupacion.routes';
import { tipoImpuestoRoutes }   from './tipos-impuestos/tipo-impuesto.routes';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/formas_pago',
    pathMatch: 'full'
  },
  ...FORMAS_PAGO_ROUTER,
  ...TABLA_GENERAL_ROUTES,
  ...AGRUPACION_ROUTES
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);