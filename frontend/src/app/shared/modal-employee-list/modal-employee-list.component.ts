import { FormGroup } from '@angular/forms';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { tap, take, catchError } from 'rxjs/operators';
import { SpinnerService } from './../services/spinner.service';
import { DadosCompartilhadosService } from './../../core/services/dados-compartilhados.service';
import { Empresa } from '../../core/model/empresa';
import { Observable, empty } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal-employee-list',
  templateUrl: './modal-employee-list.component.html',
  styleUrls: ['./modal-employee-list.component.css']
})
export class ModalEmployeeListComponent implements OnInit, OnDestroy  {

  @Input() employeesList;
  @Input() nameEmpresa;
  @Input() idEmpresa;
  @Input() idOrgNode;
  @Output() employeeListReturn = [];
  @Output() passEntry: EventEmitter <any> = new EventEmitter();
  form: FormGroup;

  funcionarios$: Observable<Empresa[]>;

  onPassCallBack() {
    this.passEntry.emit(this.employeeListReturn);
  }

  onAddEmployeeCallBack(e, employee) {
      this.employeeListReturn = this.employeeListReturn
       .map( (item) => {
        if(item.id == employee.id) {
          if(e.target.checked) {
            item.idSetorEmpresa = this.idOrgNode;
          } else {
            item.idSetorEmpresa = null;
          }
        }
        return item;
     });
  }

  onDisableEmployee(idSetorEmpresa) {
    if(idSetorEmpresa != null && idSetorEmpresa == this.idOrgNode
       || idSetorEmpresa == null) {
      return false;
    } else {
      return true;
    }
  }

  onEmployeeChecked(idSetorEmpresa) {
    return idSetorEmpresa !== null ? true : false;
  }

  constructor(
    public bsModalRef: BsModalRef,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    // this.employeeListReturn = this.employeesList.reduce((result, elem) => {
    //   if(elem.idSetorEmpresa != null) {
    //     result.push(elem);
    //   }
    //   return result;
    // },[])
    this.employeeListReturn = this.employeesList;
    this.spinnerService.hideSpinner();
   }

  @HostListener('unloaded')
  ngOnDestroy(): void { }
}
