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

  constructor(
    public medicoService: MedicoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
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
        });
      } else {
        this.modo = 'medicos';
        this.idMedico = null;
      }
    });
  }

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
