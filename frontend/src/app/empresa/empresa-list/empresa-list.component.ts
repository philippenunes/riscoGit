import { NotificacaoService } from './../../shared/services/notificacao.service';
import { SpinnerService } from './../../shared/services/spinner.service';
import { EmpresaService } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { Empresa } from '../../core/model/empresa';
import { catchError, map, tap, take } from 'rxjs/operators';


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  // json-server --watch db.json
  empresas$: Observable<Empresa[]>;

  constructor(
    private service: EmpresaService,
    private spinner: SpinnerService,
    private notify: NotificacaoService
    ) { }

  onUpdate(empresa: Empresa) {
    this.service.update(empresa)
    .pipe(
      catchError(error => {
        console.error(error);
        // this.handleError();
        return empty();
      })
    );
  }

  onDelete(empresaId: number) {
    this.service.delete(empresaId)
    .pipe(
      catchError(error => {
        console.error(error);
        // this.handleError();
        return empty();
      })
    );
  }

  ngOnInit() {
      this.empresas$ = this.service.list()
        .pipe(
          tap(() => {
            take(1)
            return;
          }),
          catchError(error => {
            console.log(error)
            this.notify.showError("Ocorreu um erro ao obter a lista de empresas.", error.statusText)
            return empty();
          })
        );
  }
}
