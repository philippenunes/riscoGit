import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaFormComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class EmpresaModule { }
