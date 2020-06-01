import { Funcionario } from '../core/model/funcionario';
import { delay, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = `${environment.API}/funcionario`;

  constructor(private http: HttpClient) {}

  create(form) {
    return this.http.post(this.API, form.value)
    .pipe(
      delay(2000),
        tap(console.log)
    )
  }

  //Lista de funcionários da empresa
  getEmployeesByIdEmpresa(idEmpresa) : Promise<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}/${idEmpresa}`).toPromise();
  }
}
