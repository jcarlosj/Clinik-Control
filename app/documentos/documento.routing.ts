// Imports del core de Angular 2 necesarios para este componente
import { Routes, RouterModule } from '@angular/router';

// Imports personalizados necesarios para este componente
import { DocumentoList }     from './documento-list.component';
import { DocumentoDetail }   from './documento-detail.component';

// Constante con los PATHs del componente
export const DOCUMENTOS_ROUTER: Routes = [
  { path: 'entradas'         , component: DocumentoList },
  { path: 'entradas/:codigo' , component: DocumentoDetail },
  { path: 'salidas'          , component: DocumentoList },
  { path: 'salidas/:codigo'  , component: DocumentoDetail },
  { path: 'compras'          , component: DocumentoList },
  { path: 'compras/:codigo'  , component: DocumentoDetail },
  { path: 'ventas'           , component: DocumentoList },
  { path: 'ventas/:codigo'   , component: DocumentoDetail }
];
