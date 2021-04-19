import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-inserir',
  templateUrl: './usuario-inserir.component.html',
  styleUrls: ['./usuario-inserir.component.css']
})
export class UsuarioInserirComponent{

  constructor(public usuarioService: UsuarioService) {}


  onAdicionarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.usuarioService.adicionarUsuario(
      form.value.id,
      form.value.nome,
      form.value.sexo,
      form.value.dtnasc,
      form.value.email,
      form.value.fone,
      form.value.cpf,
      form.value.senha,
      form.value.senhaconf
    );
    form.resetForm();
  }

}
