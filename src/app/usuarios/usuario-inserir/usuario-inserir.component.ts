import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-usuario-inserir',
  templateUrl: './usuario-inserir.component.html',
  styleUrls: ['./usuario-inserir.component.css'],
})
export class UsuarioInserirComponent implements OnInit {
  private modo = 'criar';
  private idUsuario: any;
  public usuario: any; //public cliente: Cliente;
  public estaCarregando: boolean = false;
  form!: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      fone: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idUsuario')) {
        this.modo = 'usuarioEditar';
        this.idUsuario = paramMap.get('idUsuario');
        this.estaCarregando = true;
        // this.usuario = this.usuarioService.getUsuario(this.idUsuario);
        this.usuarioService.getUsuario(this.idUsuario).subscribe((dadosUs) => {
          this.estaCarregando = false;
          this.usuario = {
            id: dadosUs._id,
            nome: dadosUs.nome,
            sexo: dadosUs.sexo,
            dtnasc: dadosUs.dtnasc,
            email: dadosUs.email,
            fone: dadosUs.fone,
            cpf: dadosUs.cpf,
            senha: dadosUs.senha,
            senhaconf: dadosUs.senhaconf,
          };
          this.form.setValue({
            nome: this.usuario.nome,
            fone: this.usuario.fone,
            email: this.usuario.email,
          });
        });
      } else {
        this.modo = 'usuarios';
        this.idUsuario = null;
      }
    });
  }

  onAdicionarUsuario(form: NgForm) {
    //aka SalvarUsuario
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'usuarios') {
      this.usuarioService.adicionarUsuario(
        form.value.id, //
        form.value.nome,
        form.value.sexo,
        form.value.dtnasc,
        form.value.email,
        form.value.fone,
        form.value.cpf,
        form.value.senha,
        form.value.senhaconf
      );
    } else {
      this.usuarioService.atualizarUsuario(
        this.idUsuario,
        form.value.nome,
        form.value.sexo,
        form.value.dtnasc,
        form.value.email,
        form.value.fone,
        form.value.cpf,
        form.value.senha,
        form.value.senhaconf
      );
    }
    form.resetForm();
  }
}
