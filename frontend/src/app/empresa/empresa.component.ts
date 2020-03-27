import { EmpresaService } from './empresa.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Empresa } from './empresa';
import { Observable, Subject, empty } from 'rxjs';
import { tap, takeUntil, take, catchError } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  preserveWhitespaces: true
})
export class EmpresaComponent implements OnInit, OnDestroy {

  // json-server --watch db.json
  whiteSpace: string = "";
  empresas$: Observable<Empresa[]>;

  constructor(private service: EmpresaService) { }

  onList() {
    this.empresas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.handleError();
        return empty();
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
