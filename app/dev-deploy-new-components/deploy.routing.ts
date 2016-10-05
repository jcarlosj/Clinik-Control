import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeployAutocompleteComponent }    from './deploy-autocomplete.component';

export const DEPLOY_ROUTER: Routes = [
  { path: 'deploy',  component: DeployAutocompleteComponent }
];