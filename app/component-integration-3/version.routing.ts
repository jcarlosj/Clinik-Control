// Imports del core de Angular 2 necesarios para este componente
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { VersionParentComponent } from './version-parent.component';

// Constante con los PATHs del componente
export const COMPONENT_INTEGRATION_3_ROUTER: Routes = [
  { path: 'padre-3' , component: VersionParentComponent }
];