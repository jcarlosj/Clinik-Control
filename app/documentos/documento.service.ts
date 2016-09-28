// Imports del core de Angular 2 necesarios para este componente
import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Imports personalizados necesarios para este componente
import { Path }           from '../paths';
import { Documento }      from '../documentos/documento';

// Decorator
@Injectable()

// Class
export class DocumentoService {

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
  getRecords( path: string ) {

    // Redirecciona la URL web API agregandole el PATH
    this .path   = path;
    let url = `${Path.Server.API}${this.path}`;
    console .log( 'Listado registros: ' + Path.Server.API + this.path + ' *** ' + this .url );

    return this.http.get( url )
               .toPromise()
               .then(response => response.json().data as Documento[])
               .catch(this.handleError);
  }

  getRecord(codigo: string) {
      console .log( 'Lista registro: ' + Path.Server.API + this.path + ' *** ' + this .url );

      return this.getRecords( this .path )
          .then( obj => obj.find(obj => obj.codigo === codigo) );
  }

  save(obj: Documento, esNuevo: boolean): Promise<Documento>  {
    if (esNuevo) {

      return this.post(obj);
    }

    return this.put(obj);
  }

  // Delete
  delete(obj: Documento) {

    console .log( 'Elimina: ' + Path.Server.API + this.path );
    this .url = `${Path.Server.API}${this.path}/${obj.codigo}`;

    return this.http
               .delete(this .url, {headers: this .headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new
  private post(obj: Documento): Promise<Documento> {

    this .url = `${Path.Server.API}${this.path}`;
    console .log( 'Guarda nuevo: ' + Path.Server.API + this.path + ' *** ' + this .url );

    return this.http
               .post( this .url, JSON.stringify(obj), {headers: this .headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing
  private put(obj: Documento) {

    console .log( 'Objeto: ' + Object .keys( obj ) );
    console .log( 'Objeto: ' + Object .values( obj ) );
    console .log( 'Editar: ' + obj.codigo );

    this .url = `${Path.Server.API}${this.path}/${obj.codigo}`;

    console .log( 'Guarda nuevo: ' + Path.Server.API + this.path + ' *** ' + this .url );
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
