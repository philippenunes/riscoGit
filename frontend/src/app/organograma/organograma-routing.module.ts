import { OrganogramaFormComponent } from './organograma-form/organograma-form.component';
import { OrganogramaComponent } from './organograma.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const organogramaRoutes: Routes = [
  { path: '', component: OrganogramaComponent,
      // canActivateChild: [OrganogramaGuard],
      children: [
          {path: 'cadastro', component: OrganogramaFormComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(organogramaRoutes)],
  exports: [RouterModule]
})
export class OrganogramaRoutingModule { }
