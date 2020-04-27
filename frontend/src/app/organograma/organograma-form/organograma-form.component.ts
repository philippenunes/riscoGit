import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organograma-form',
  templateUrl: './organograma-form.component.html',
  styleUrls: ['./organograma-form.component.css']
})
export class OrganogramaFormComponent implements OnInit {

  novoSetorPai: string = "";
  formOrganograma: FormGroup;
  centrosDeCusto: any = ['123123', '019293', '7126387263', '823623623'];
  noPrincipalLista: string[] = ['Presidência', 'Diretoria Comercial', 'Direotria administrativa',
   'Diretoria Produção', 'Gerência de Marketing', 'Serviços técnicos'];

  constructor(private formBuilder: FormBuilder) {

  }

  incluirNoPrincipal () {
    if(this.novoSetorPai != "") {
      this.noPrincipalLista.push(this.novoSetorPai);
      this.novoSetorPai = "";
    }
  }

  openModalIncluirNoPrincipal () {

  }

  onSubmit() {

  }

  ngOnInit() {
    this.formOrganograma = this.formBuilder.group({
      orgPai: ['Selecione...'],
      nome: [null],
      descricao: [null],
      centroDeCusto: ['Selecione...'],
      funcionarios: [null],
    })
  }
}
