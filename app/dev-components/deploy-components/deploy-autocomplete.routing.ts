import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeployComponent }    from '../deploy.component';
import { DeployAutocompleteComponent }    from './deploy-autocomplete.component';

export const AUTOCOMPLETE_ROUTER: Routes = [
  { path: 'componentes' ,  component: DeployComponent },
  { path: 'autocomplete',  component: DeployAutocompleteComponent }
];