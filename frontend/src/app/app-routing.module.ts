import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'organograma',
      loadChildren: () =>
      import('./organograma/organograma.module')
      .then(m => m.OrganogramaModule)
       // canActivate: [AuthGuardOrganograma],
      // canActivateChild: [OrganogramaGuard]
  },
  { path: 'empresas',
      loadChildren: () =>
       import('./empresa/empresa.module')
       .then(m => m.EmpresaModule)
      // canActivate: [AuthGuardEmpresa],
      // canActivateChild: [EmpresaGuard]
  },
  { path: 'funcionario',
      loadChildren: () =>
       import('./funcionario/funcionario.module')
       .then(m => m.FuncionarioModule)
      // canActivate: [AuthGuardFuncionario],
      // canActivateChild: [FuncionarioGuard]
  },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
