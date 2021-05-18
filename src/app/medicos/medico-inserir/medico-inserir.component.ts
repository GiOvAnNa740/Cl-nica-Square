import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../medico.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-medico-inserir',
  templateUrl: './medico-inserir.component.html',
  styleUrls: ['./medico-inserir.component.css'],
})
export class MedicoInserirComponent implements OnInit{
  private modo = 'criar';
  private idMedico: any;
  public medico: any;
  public estaCarregando: boolean = false;
  form!: FormGroup;

  constructor(
    public medicoService: MedicoService,
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
      if (paramMap.has('idMedico')) {
        this.modo = 'medicoEditar';
        this.idMedico = paramMap.get('idMedico');
        this.medicoService.getMedico(this.idMedico).subscribe((dadosMe) => {
          this.medico = {
            id: dadosMe._id,
            nome: dadosMe.nome,
            sexo: dadosMe.sexo,
            dtnasc: dadosMe.dtnasc,
            email: dadosMe.email,
            fone: dadosMe.fone,
            cpf: dadosMe.cpf,
            espec: dadosMe.espec,
            crm: dadosMe.crm,
            senha: dadosMe.senha,
            senhaconf: dadosMe.senhaconf,
          };
          this.form.setValue({
            nome: this.medico.nome,
            sexo: this.medico.sexo,
            dtnasc: this.medico.dtnasc,
            email: this.medico.email,
            fone: this.medico.fone,
            cpf: this.medico.cpf,
            espec: this.medico.espec,
            crm: this.medico.crm,
            senha: this.medico.senha,
          });
        });
      } else {
        this.modo = 'criar';
        this.idMedico = null;
      }
    });
  }

  onAdicionarMedico() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar"){
    this.medicoService.adicionarMedico(
      this.form.value.id,
      this.form.value.nome,
      this.form.value.sexo,
      this.form.value.dtnasc,
      this.form.value.email,
      this.form.value.fone,
      this.form.value.cpf,
      this.form.value.espec,
      this.form.value.crm,
      this.form.value.senha,
      this.form.value.senhaconf
    );
    }else{
      this.medicoService.atualizarMedico(
        this.idMedico,
        this.form.value.nome,
        this.form.value.sexo,
        this.form.value.dtnasc,
        this.form.value.email,
        this.form.value.fone,
        this.form.value.cpf,
        this.form.value.espec,
        this.form.value.crm,
        this.form.value.senha,
        this.form.value.senhaconf
      );
    }
    this.form.reset();
  }
}
