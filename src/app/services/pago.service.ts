import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {resolve} from 'url';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private urlBase: string;
  private apis: any;
  constructor(
    private http: HttpClient
  ) {
    this.urlBase = environment.api.urlBase;
    this.apis = environment.api.resources.pago;
  }

  create(data) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(uri, data)
      .toPromise()
      .then(()=> {
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}
