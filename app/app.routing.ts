import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';

import { FORMAS_PAGO_ROUTER }    from './formas-pago/formas-pago.routing';
import { TABLA_GENERAL_ROUTER }  from './tablas-generales/tabla-general.routing';
import { AGRUPACION_ROUTER }     from './agrupaciones/agrupacion.routing';
import { PRODUCTOS_ROUTER }      from './productos/producto.routing';
import { TIPOS_IMPUESTO_ROUTER } from './tipos-impuesto/tipo-impuesto.routing';
import { TERCEROS_ROUTER }       from './terceros/tercero.routing';
import { DOCUMENTOS_ROUTER }     from './documentos/documento.routing' 

import { COMPONENT_INTEGRATION_1_ROUTER } from './component-integration-1/hero.routing';
import { COMPONENT_INTEGRATION_2_ROUTER } from './component-integration-2/name.routing';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/entradas',
    pathMatch: 'full'
  },
  ...FORMAS_PAGO_ROUTER,
  ...TABLA_GENERAL_ROUTER,
  ...AGRUPACION_ROUTER,
  ...PRODUCTOS_ROUTER,
  ...TIPOS_IMPUESTO_ROUTER,
  ...TERCEROS_ROUTER,
  ...DOCUMENTOS_ROUTER,
  ...COMPONENT_INTEGRATION_1_ROUTER,
  ...COMPONENT_INTEGRATION_2_ROUTER
  
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);