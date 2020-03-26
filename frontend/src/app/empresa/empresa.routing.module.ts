import { EmpresaComponent } from './empresa.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const empresaRoutes: Routes = [
    { path: '', component: EmpresaComponent
        // canActivateChild: [EmpresaGuard],
        // children: [
        //     {path: 'novo', component: EmpresaDetalheComponent}
        // ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(empresaRoutes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule {
}
