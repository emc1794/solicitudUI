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
    const uri = resolve(this.urlBase, this.apis.get);
    console.log(uri)
    return this.http.get(uri)
    .toPromise()
    .then(data => Promise.resolve(data))
    .catch(error => Promise.resolve(error))
  }
}
