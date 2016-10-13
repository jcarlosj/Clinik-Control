import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { DEPLOY_COMPONENTS_ROUTER } from './deploy-components/deploy-components.routing';

const deployRoutes: Routes = [
  {
    path: 'componentes',
    redirectTo: '/componentes',
    pathMatch: 'full'
  },
  ...DEPLOY_COMPONENTS_ROUTER
];

export const deployRoutingProviders: any[] = [

];

export const routingDeploy: ModuleWithProviders = RouterModule.forRoot( deployRoutes );