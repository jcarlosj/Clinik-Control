// Imports del core de Angular 2 necesarios para este componente
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { VoteTakerComponent } from './voter-taker.component';

// Constante con los PATHs del componente
export const COMPONENT_INTEGRATION_4_ROUTER: Routes = [
  { path: 'padre-4' , component: VoteTakerComponent }
];