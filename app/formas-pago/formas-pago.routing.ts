//import { RouterConfig }         from '@angular/router';

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FormaPagoListComponent }    from './forma-pago-list.component';
import { FormaPagoDetailComponent }  from './forma-pago-detail.component';

export const FORMAS_PAGO_ROUTER: Routes = [
  { path: 'formas_pago',  component: FormaPagoListComponent },
  { path: 'forma_pago/:codigo', component: FormaPagoDetailComponent }
];