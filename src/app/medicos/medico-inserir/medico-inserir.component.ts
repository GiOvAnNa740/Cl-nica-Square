import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-medico-inserir',
  templateUrl: './medico-inserir.component.html',
  styleUrls: ['./medico-inserir.component.css']
})
export class MedicoInserirComponent {
  constructor(public medicoService: MedicoService) {}


  onAdicionarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.medicoService.adicionarMedico(
      form.value.id,
      form.value.nome,
      form.value.sexo,
      form.value.dtnasc,
      form.value.email,
      form.value.fone,
      form.value.cpf,
      form.value.espec,
      form.value.crm,
      form.value.senha,
      form.value.senhaconf
    );
    form.resetForm();
  }

}
