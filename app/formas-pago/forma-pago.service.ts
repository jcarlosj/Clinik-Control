import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/share';
//import 'rxjs/add/operator/map';

import { FormaPago } from '../formas-pago/forma-pago';

@Injectable()

export class FormaPagoService {

  private formaspagoUrl = 'app/formas_pago';  // URL to web api
 
  constructor( 
    private http: Http 
  ) { }

  getRecords(): Promise <FormaPago[]> { 
    return this.http.get(this.formaspagoUrl)
               .toPromise()
               .then(
                response => response.json().data as FormaPago[])
               .catch(this.handleError);
  }


  getRecord(codigo: string) {
      return this.getRecords()
          .then(forma_pago => forma_pago.find(forma_pago => forma_pago.codigo === codigo));
  }
  
  public save(formapago: FormaPago, esNuevo: boolean): Promise<FormaPago>  {
    if (esNuevo){
      return this.post(formapago);
    }
    return this.put(formapago);
  }

  public delete( formapago: FormaPago) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.formaspagoUrl}/${formapago.codigo}`;
    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new forma pago
  private post(formapago: FormaPago): Promise<FormaPago> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.formaspagoUrl, JSON.stringify(formapago), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing forma pago
  private put(formapago: FormaPago) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let url = `${this.formaspagoUrl}/${formapago.codigo}`;

    return this.http
               .put(url, JSON.stringify(formapago), {headers: headers})
               .toPromise()
               .then(() => formapago)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}