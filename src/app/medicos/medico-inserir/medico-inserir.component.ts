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

  onAdicionarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar"){
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
    }else{
      this.medicoService.atualizarMedico(
        this.idMedico,
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
    }
    form.reset();
  }
}
