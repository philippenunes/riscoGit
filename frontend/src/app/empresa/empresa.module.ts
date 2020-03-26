import { EmpresaRoutingModule } from './empresa.routing.module';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule
  ],
  providers: [],
})
export class EmpresaModule { }
