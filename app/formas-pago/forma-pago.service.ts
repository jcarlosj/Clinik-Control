// Imports del core de Angular 2 necesarios para este componente
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

// Imports personalizados necesarios para este componente
import { Path }           from '../paths';
import { FormaPago } from '../formas-pago/forma-pago';

// Decorator
@Injectable()

// Clase principal para este servicio
export class FormaPagoService {

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
  public getRecords( path: string ): Promise <FormaPago[]> { 

  // Redirecciona la URL web API agregandole el PATH
  this .path   = path;
  let url = `${Path.API}${this.path}`;
  console .log( 'Listado registros: ' + Path.API + this.path + ' *** ' + this .url );

    return this.http.get( url )
               .toPromise()
               .then(
                response => response.json().data as FormaPago[])
               .catch(this.handleError);
  }

  public getRecord(codigo: string) {
      console .log( 'Lista registro: ' + Path.API + this.path + ' *** ' + this .url );

      return this .getRecords( this .path )
                  .then(obj => obj.find(obj => obj.codigo === codigo));
  }
  
  public save(obj: FormaPago, esNuevo: boolean): Promise<FormaPago>  {
    if (esNuevo){

      return this.post(obj);
    }

    return this.put(obj);
  }

  public delete( obj: FormaPago) {
    
    console .log( 'Elimina: ' + Path.API + this.path );
    this .url = `${Path.API}${this.path}/${obj.codigo}`;

    return this.http
               .delete( this .url, {headers: this .headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new
  private post(obj: FormaPago): Promise<FormaPago> {
    
    this .url = `${Path.API}${this.path}`;
    console .log( 'Guarda nuevo: ' + Path.API + this.path + ' *** ' + this .url );

    return this.http
               .post(this .url, JSON.stringify(obj), {headers: this .headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing
  private put(obj: FormaPago) {

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