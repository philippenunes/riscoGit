import { OrganogramaRoutingModule } from './organograma-routing.module';
import { OrganogramaComponent } from './organograma.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrganogramaFormComponent } from './organograma-form/organograma-form.component';


@NgModule({
  declarations: [
    OrganogramaComponent,
    OrganogramaFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganogramaRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class OrganogramaModule { }
