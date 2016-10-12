import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { AUTOCOMPLETE_ROUTER } from './deploy-components/deploy-autocomplete.routing';

const deployRoutes: Routes = [
  {
    path: 'componentes',
    redirectTo: '/componentes',
    pathMatch: 'full'
  },
  ...AUTOCOMPLETE_ROUTER
];

export const deployRoutingProviders: any[] = [

];

export const routingDeploy: ModuleWithProviders = RouterModule.forRoot( deployRoutes );