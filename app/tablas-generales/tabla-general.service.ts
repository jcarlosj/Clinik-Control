// Imports del core de Angular 2 necesarios para este componente
import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Imports personalizados necesarios para este componente
import { Path }           from '../paths';
import { TablaGeneral }   from '../tablas-generales/tabla-general';

// Decorator
@Injectable()

// Class
export class TablaGeneralService {

  // Atributes
  private path : string;
  private headers: Headers;
  private url: string;

  // Constructor
  constructor( private http: Http ) {
    this .headers = new Headers();
    this .headers .append('Content-Type', 'application/json');
  }

  // Methods
  getTablasGenerales( path: string ) {

    // Redirecciona la URL web API agregandole el PATH
    this .path   = path;
    let url = `${Path.API}${this.path}`;
    console .log( 'Listado registros: ' + Path.API + this.path + ' *** ' + this .url );

    return this.http.get( url )
               .toPromise()
               .then(response => response.json().data as TablaGeneral[])
               .catch(this.handleError);
  }

  getTablaGeneral(codigo: string) {
      console .log( 'Lista registro: ' + Path.API + this.path + ' *** ' + this .url );

      return this.getTablasGenerales( this .path )
          .then( obj => obj.find(obj => obj.codigo === codigo) );
  }

  save(obj: TablaGeneral, esNuevo: boolean): Promise<TablaGeneral>  {
    if (esNuevo) {

      return this.post(obj);
    }

    return this.put(obj);
  }

  // Delete
  delete(obj: TablaGeneral) {

    console .log( 'Elimina: ' + Path.API + this.path );
    this .url = `${Path.API}${this.path}/${obj.codigo}`;

    return this.http
               .delete(this .url, {headers: this .headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new
  private post(obj: TablaGeneral): Promise<TablaGeneral> {

    this .url = `${Path.API}${this.path}`;
    console .log( 'Guarda nuevo: ' + Path.API + this.path + ' *** ' + this .url );

    return this.http
               .post( this .url, JSON.stringify(obj), {headers: this .headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing
  private put(obj: TablaGeneral) {

    console .log( 'Objeto: ' + Object .keys( obj ) );
    console .log( 'Objeto: ' + Object .values( obj ) );
    console .log( 'Editar: ' + obj.codigo );

    this .url = `${Path.API}${this.path}/${obj.codigo}`;

    console .log( 'Guarda nuevo: ' + Path.API + this.path + ' *** ' + this .url );
    console .log( 'Los datos seran enviados a la urlAPI: ' + this .url );

    return this.http
               .put( this .url, JSON.stringify(obj), {headers: this .headers})
               .toPromise()
               .then(() => obj)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
