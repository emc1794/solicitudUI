import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlBase: string;
  private apis: any;
  constructor(
    private http: HttpClient
  ) {
    this.urlBase = environment.api.urlBase;
    this.apis = environment.api.resources.cliente;

  }

  getAll(options) {
    let params = new HttpParams();
    if (options.search) {
      params = params.set('search', options.search);
    }
    if (options.page) {
      params = params.set('page', options.page);
    }
    if (options.pageSize) {
      params = params.set('pageSize', options.pageSize);
    }
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.get(uri, {params})
    .toPromise()
    .catch(error => Promise.reject(error));
  }

  create(cliente) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(uri, cliente)
    .toPromise()
    .catch(error => Promise.reject(error));
  }
  update(clienteId ,cliente) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.put(`${uri}/${clienteId}`, cliente)
    .toPromise()
    .catch(error => Promise.reject(error));
  }

  delete(clienteId) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.delete(`${uri}/${clienteId}`)
    .toPromise()
    .catch(error => Promise.reject(error));
  }
}
