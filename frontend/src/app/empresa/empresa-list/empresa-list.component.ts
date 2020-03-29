import { EmpresaService } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { Empresa } from '../empresa';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  // json-server --watch db.json
  whiteSpace: string = "";
  empresas$: Observable<Empresa[]>;

  constructor(private service: EmpresaService) { }

  ngOnInit(): void {
    this.empresas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.handleError();
        return empty();
      })
    );
  }
}
