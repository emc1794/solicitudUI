import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  private urlBase: string;
  private apis: any;
  constructor(
    private http: HttpClient
  ) {
    this.urlBase = environment.api.urlBase;
    this.apis = environment.api.resources.atencion;

  }

  getAll() {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.get(uri)
    .toPromise()
    .then(data => Promise.resolve(data))
    .catch(error => Promise.reject(error));
  }

  getById(id) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.get(`${uri}/${id}`)
      .toPromise()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  delete(id) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.delete(`${uri}/${id}`)
      .toPromise()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }
  create(atencion) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(uri, atencion)
      .toPromise()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }
  updateTotal(id) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(`${uri}/total`, {id})
      .toPromise()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  update(id, atencion) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.put(`${uri}/${id}`, atencion)
      .toPromise()
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }
}
