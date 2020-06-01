import { OrganogramaFormComponent } from './organograma-form/organograma-form.component';
import { OrganogramaRoutingModule } from './organograma-routing.module';
import { OrganogramaComponent } from './organograma.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';
import { OrganogramaTreeComponent } from './organograma-tree/organograma-tree.component';
import { OrganogramaDetailComponent } from './organograma-detail/organograma-detail.component';

@NgModule({
  declarations: [
    OrganogramaComponent,
    OrganogramaFormComponent,
    OrganogramaTreeComponent,
    OrganogramaDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganogramaRoutingModule,
    SharedModule,
    OrgChartModule
  ],
  providers: [],
})
export class OrganogramaModule { }
