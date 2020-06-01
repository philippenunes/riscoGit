import { environment } from './../../environments/environment';
import { Empresa } from '../core/model/empresa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `${environment.API}/empresa`;

  constructor(private http: HttpClient) { }

  list() {
    type Empresa = Empresa[];
    return this.http.get<Empresa>(this.API)
      .pipe(
          tap(console.log)
      );
  }

  create(form) {
    return this.http.post(this.API, form.value)
      .pipe(
        delay(2000),
          tap(console.log)
      )
  }

  delete(empresaId) {
    return this.http.delete(this.API, empresaId)
      .pipe(
        tap(console.log)
      )
  }

  update(empresa: Empresa) {
    return this.http.put(this.API, empresa)
      .pipe(
        tap(console.log)
      )
  }

  findById(empresaId: number) {
    return this.http.get(`${this.API}/${empresaId}`)
      .pipe(
        tap(console.log)
      )
  }
}
