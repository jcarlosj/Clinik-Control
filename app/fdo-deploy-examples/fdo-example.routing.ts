import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FdoExampleComponent }    from './fdo-example.component';

export const FDO_EXAMPLES_ROUTER: Routes = [
  { path: 'fdo-examples',  component: FdoExampleComponent }
];