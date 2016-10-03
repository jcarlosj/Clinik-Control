// Imports del core de Angular 2 necesarios para este componente
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { HeroParentComponent } from './hero-parent.component';
import { HeroChildComponent }  from './hero-child.component';

// Constante con los PATHs del componente
export const COMPONENT_INTEGRATION_1_ROUTER: Routes = [
  { path: 'padre-1' , component: HeroParentComponent },
  { path: 'hijo-1'  , component: HeroChildComponent }
];