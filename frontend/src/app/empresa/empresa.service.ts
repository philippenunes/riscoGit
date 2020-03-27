import { environment } from './../../environments/environment';
import { Empresa } from './empresa';
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

  create(empresa) {
      return this.http.post(this.API, empresa)
      .pipe(
        tap(console.log)
    );
  }
}
