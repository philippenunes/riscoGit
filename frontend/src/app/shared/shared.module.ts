import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ModalEmployeeListComponent } from './modal-employee-list/modal-employee-list.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ModalEmployeeListComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ModalEmployeeListComponent
  ]
})
export class SharedModule { }
