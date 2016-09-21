import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }    from './app.component';

import { FORMAS_PAGO_ROUTER }   from './formas-pago/formas-pago.routing';
import { TABLA_GENERAL_ROUTER } from './tablas-generales/tabla-general.routing';
import { AGRUPACION_ROUTER }    from './agrupaciones/agrupacion.routing';
import { PRODUCTOS_ROUTER }     from './productos/producto.routing';
import { tipoImpuestoRoutes }   from './tipos-impuestos/tipo-impuesto.routes';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/formas_pago',
    pathMatch: 'full'
  },
  ...FORMAS_PAGO_ROUTER,
  ...TABLA_GENERAL_ROUTER,
  ...AGRUPACION_ROUTER,
  ...PRODUCTOS_ROUTER
  
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);