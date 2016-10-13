import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';

import { routingDeploy, deployRoutingProviders } from './deploy.routing';

// Imports de packages externos
import { MdlModule } from 'angular2-mdl';       // <--- Material Design Lite

// Imports for loading & configuring the in-memory web api
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from '../in-memory-data.service';

import { DeployComponent } from './deploy.component';

import { DeployAutocompleteComponent } from './deploy-components/deploy-autocomplete.component';
import { AutoCompleteComponentByModule } from '../../components/autocomplete/autocomplete.component';

import { DeployAddSearchToTheListComponent } from './deploy-components/deploy-add-search-to-the-list.component';
import { AddSearchToTheListComponentByModule } from '../../components/add-search-to-the-list/add-search-to-the-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,          // <--- Material Design Lite
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routingDeploy
  ],
  declarations: [
    DeployComponent,
    DeployAutocompleteComponent,
    DeployAddSearchToTheListComponent,
    AutoCompleteComponentByModule,          // <-- Child de AutoCompleteComponent
    AddSearchToTheListComponentByModule     // <-- Child de AddSearchToTheListComponent
  ],
  providers: [
    deployRoutingProviders  
    /*,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data*/
  ],
  bootstrap: [ DeployComponent ]
})

export class DeployModule {
}