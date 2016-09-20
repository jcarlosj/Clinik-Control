import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Path } from './paths';

import { Data } from './data';

@Injectable()

export class DataService {

  private formaspagoUrl = Path.Server.API + '/data';  // URL to web api
  constructor(private http: Http) {
    console.log( this.formaspagoUrl ); 
  }

  getData(): Promise <any[]> { 
    return this.http.get(this.formaspagoUrl)
               .toPromise()
               .then(
                response => response.json().data as Data[])
               .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  getFormaPago(codigo: string) {
      return this.getData()
          .then( obj =>  obj.find( obj =>  obj.codigo === codigo));
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
}