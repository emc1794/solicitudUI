import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {resolve} from "url";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase: string;
  private apis: any;
  constructor(
    private http: HttpClient
  ) {
    this.urlBase = environment.api.urlBase;
    this.apis = environment.api.resources.producto;
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

  create(producto) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(uri, producto)
    .toPromise()
    .catch(error => Promise.reject(error));
  }
  update(productoId ,producto) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.put(`${uri}/${productoId}`, producto)
    .toPromise()
    .catch(error => Promise.reject(error));
  }

  delete(productoId) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.delete(`${uri}/${productoId}`)
    .toPromise()
    .catch(error => Promise.reject(error));
  }
}
