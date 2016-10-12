import { Component }          from '@angular/core';

//import './rxjs-extensions';

@Component({
  moduleId    : module.id,
  selector    : 'dev-components',
  templateUrl : 'deploy.component.html',
  styleUrls   : ['deploy.component.css']
})
export class DeployComponent {

  // Atributes
  private title       : string = 'Componentes desarrollados';
  private urlTitle    : string = '/componentes';
  private description : string = 'v0.2';

  private menu                  : any;

  // Constructor
  public constructor( ) {
    this .menu = [
      { path: '/autocomplete', nameItem: 'Autocomplete' }
    ]; 
  }
}