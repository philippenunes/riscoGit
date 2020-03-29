import { FuncionarioComponent } from './funcionario.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const funcionarioRoutes: Routes = [
    { path: '', component: FuncionarioComponent
        // canActivateChild: [FuncionarioGuard],
        // children: [
        //     {path: 'novo', component: FuncionarioDetalheComponent}
        // ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(funcionarioRoutes)],
    exports: [RouterModule]
})
export class FuncionarioRoutingModule {
}
