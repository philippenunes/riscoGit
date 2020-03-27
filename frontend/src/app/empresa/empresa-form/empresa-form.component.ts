import { EmpresaService } from './../empresa.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  preserveWhitespaces: true
})
export class EmpresaFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private service: EmpresaService,
    private fb: FormBuilder
    ) { }

  onSubmit() {
    this.service.create(this.form)
    .subscribe(
      success => {
        console.log(success)
      },
        error => console.log(error)
    )
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: Number,
      nome: String
    });
  }

}
