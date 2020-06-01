import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { FuncionarioRoutingModule } from './funcionario.routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';


@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FuncionarioRoutingModule,
  ],
  entryComponents: [FuncionarioListComponent],
  providers: [],
})

export class FuncionarioModule { }

// export class FuncionarioModule implements DoBootstrap {
//   constructor(private injector: Injector) {
//     const webComponent = createCustomElement(FuncionarioListComponent, {injector});
//     customElements.define('funcionario-list', webComponent);
//   }
//   ngDoBootstrap() {}
// }
