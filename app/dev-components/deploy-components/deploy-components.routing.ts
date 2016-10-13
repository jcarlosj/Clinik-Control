import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeployComponent }    from '../deploy.component';
import { DeployAutocompleteComponent }    from './deploy-autocomplete.component';
import { DeployAddSearchToTheListComponent } from './deploy-add-search-to-the-list.component';

export const DEPLOY_COMPONENTS_ROUTER: Routes = [
  { path: 'componentes'           ,  component: DeployComponent },
  { path: 'autocomplete'          ,  component: DeployAutocompleteComponent },
  { path: 'add-search-to-the-list',  component: DeployAddSearchToTheListComponent }
];