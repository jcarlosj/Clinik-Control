import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { FormaPagoListComponent }  from './formas-pago/forma-pago-list.component';
import { FormaPagoDetailComponent }  from './formas-pago/forma-pago-detail.component';
import { FormaPagoService} from './formas-pago/forma-pago.service';

import { TablaGeneralService } from './tablas-generales/tabla-general.service';
import { TablaGeneralList }    from './tablas-generales/tabla-general-list.component';
import { TablaGeneralDetail }  from './tablas-generales/tabla-general-detail.component';

import { AgrupacionService } from './agrupaciones/agrupacion.service';
import { AgrupacionListComponent }    from './agrupaciones/agrupacion-list.component';
import { AgrupacionDetailComponent }    from './agrupaciones/agrupacion-detail.component';

import { ProductoService }         from './productos/producto.service';
import { ProductoListComponent }   from './productos/producto-list.component';
import { ProductoDetailComponent } from './productos/producto-detail.component';


import { TipoImpuestoService }         from './tipos-impuesto/tipo-impuesto.service';
import { TipoImpuestoListComponent }   from './tipos-impuesto/tipo-impuesto-list.component';
import { TipoImpuestoDetailComponent } from './tipos-impuesto/tipo-impuesto-detail.component';

import { DataService } from './data.service';

import { routing, appRoutingProviders }        from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    FormaPagoListComponent,
    FormaPagoDetailComponent,
    TablaGeneralList,
    TablaGeneralDetail,
    AgrupacionListComponent,
    AgrupacionDetailComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    TipoImpuestoListComponent,
    TipoImpuestoDetailComponent
  ],
  providers: [
    appRoutingProviders,
    DataService, 
    FormaPagoService,
    TablaGeneralService,        
    AgrupacionService,
    ProductoService,
    TipoImpuestoService/*,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data*/
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}