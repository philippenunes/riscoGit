import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { SharedModule } from './../shared/shared.module';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaFormComponent,
    EmpresaListComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
})
export class EmpresaModule { }
