// Imports del core de Angular 2 necesarios para este componente
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { NameParentComponent } from './name-parent.component';

// Constante con los PATHs del componente
export const COMPONENT_INTEGRATION_2_ROUTER: Routes = [
  { path: 'padre-2' , component: NameParentComponent }
];