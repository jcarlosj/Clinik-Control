// Imports del core de Angular 2 necesarios para este componente
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Imports personalizados necesarios para este componente
import { TipoImpuesto } from '../tipos-impuestos/tipo-impuesto';

// Decorator
@Injectable()

// Class
export class TipoImpuestoService {

  // Atributes
  private urlApi = 'app/tipos_impuesto';  // URL to web api

  // Constructor
  constructor(private http: Http) {

  }

  // Methods
  getTiposImpuestos() {
    return this.http.get(this.urlApi)
               .toPromise()
               .then(response => response.json().data as TipoImpuesto[])
               .catch(this.handleError);
  }

  getTipoImpuesto(codigo: string) {
      return this.getTiposImpuestos()
          .then(obj => obj.find(obj => obj.codigo === codigo));
  }

  save(obj: TipoImpuesto, esNuevo: boolean): Promise<TipoImpuesto>  {
    /*if (obj.codigo) {*/
    if (esNuevo){
      console .log( 'esNuevo (Post): ' + esNuevo );
      debugger;
      return this.post(obj);
    }
    console .log( 'esNuevo (Put): ' + esNuevo );
    return this.put(obj);
  }

  delete(obj: TipoImpuesto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.urlApi}/${obj.codigo}`;
    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new forma pago
  private post(obj: TipoImpuesto): Promise<TipoImpuesto> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.urlApi, JSON.stringify(obj), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing forma pago
  private put(obj: TipoImpuesto) {
    console .log( 'obj: ' + Object .keys( obj ) );
    console .log( 'obj: ' + Object .values( obj ) );
    //debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console .log( 'Editar: ' + obj.codigo );
    let url = `${this.urlApi}/${obj.codigo}`;
    console .log( 'Los datos seran enviados a la urlAPI: ' + url ); debugger;
    return this.http
               .put(url, JSON.stringify(obj), {headers: headers})
               .toPromise()
               .then(() => obj)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
