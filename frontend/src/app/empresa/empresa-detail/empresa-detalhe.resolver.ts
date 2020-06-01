import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { SpinnerService } from './../../shared/services/spinner.service';
import { tap, take, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { EmpresaService } from '../empresa.service';
import { Empresa } from '../../core/model/empresa';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaDetalheResolver implements Resolve<Empresa> {
  constructor(
    private empresaService: EmpresaService,
    private spinner: SpinnerService,
    private notify: NotificacaoService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    console.log('EmpresaDetalheResolver');
    let id = route.params['id'];
    return this.empresaService.findById(id);
  }
}
