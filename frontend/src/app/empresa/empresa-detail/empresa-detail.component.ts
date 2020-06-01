import { Empresa } from '../../core/model/empresa';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {

  inscricao: Subscription;
  empresa: Empresa;
  topoOrg: string;
  descOrg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onNovoOrganograma() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true,
      queryParams: {
          idEmpresa: this.empresa.id,
          nomeEmpresa: this.empresa.nome,
          descEmpresa: this.empresa.descricao,
          topoOrg: this.topoOrg,
          descOrg: this.descOrg
        }
      }
      this.router.navigate(['/organograma'],  navigationExtras);
  }

  ngOnInit(): void {
    this.inscricao = this.route.data.subscribe(
      (info: {empresa: Empresa}) => {
        console.log('Recebendo o obj Empresa do resolver');
        this.empresa = info.empresa;
      }
    );
  }
}
