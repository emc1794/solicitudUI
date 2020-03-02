import { Injectable } from '@angular/core';
import {resolve} from 'url';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleAtencionService {
  private urlBase: string;
  private apis: any;
  constructor(
    private http: HttpClient
  ) {
    this.urlBase = environment.api.urlBase;
    this.apis = environment.api.resources.detalleAtencion;
  }
  create(detalles) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.post(uri, detalles)
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

  update(atencionId, productoId ,detalle) {
    const uri = resolve(this.urlBase, this.apis.default);
    return this.http.put(`${uri}/${atencionId}/${productoId}`, detalle)
    .toPromise()
    .catch(error => Promise.reject(error));
  }
}
