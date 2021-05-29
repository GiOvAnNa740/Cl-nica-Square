import { Injectable } from '@angular/core';
import { Medico } from './medico.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private medAutenticado: boolean = false;
  private token: any;
  private authStatusSubject = new Subject<boolean>();
  private medicos: Medico[] = [];
  private listaMedicosAtualizada = new Subject<Medico[]>();

  public getToken(): string {
    return this.token;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  atualizarMedico(
    id: string,
    nome: string,
    sexo: string,
    dtnasc: string,
    email: string,
    fone: string,
    cpf: string,
    espec: string,
    crm: string,
    senha: string,
    senhaconf: string
  ) {
    const medico: Medico = {
      id,
      nome,
      sexo,
      dtnasc,
      email,
      fone,
      cpf,
      espec,
      crm,
      senha,
      senhaconf,
    };
    this.httpClient
      .put(`http://localhost:3000/api/medicos/${id}`, medico)
      .subscribe((res) => {
        const copia = [...this.medicos];
        const indice = copia.findIndex((me) => me.id === medico.id);
        copia[indice] = medico;
        this.medicos = copia;
        this.listaMedicosAtualizada.next([...this.medicos]);
      });
  }

  getMedico(idMedico: string) {
    //return { ...this.medicos.find((me) => me.id === idMedico) };
    return this.httpClient.get<{
      _id: string;
      nome: string;
      sexo: string;
      dtnasc: string;
      email: string;
      fone: string;
      cpf: string;
      espec: string;
      crm: string;
      senha: string;
      senhaconf: string;
    }>(`http://localhost:3000/api/medicos/${idMedico}`);
  }

  getMedicos(): void {
    this.httpClient
      .get<{ mensagem: string; medicos: any }>(
        'http://localhost:3000/api/medicos'
      )
      .pipe(
        map((dados) => {
          return dados.medicos.map((medico: any) => {
            return {
              id: medico._id,
              nome: medico.nome,
              sexo: medico.sexo,
              dtnasc: medico.dtnasc,
              email: medico.email,
              fone: medico.fone,
              cpf: medico.cpf,
              espec: medico.espec,
              crm: medico.crm,
              senha: medico.senha,
              senhaconf: medico.senhaconf,
            };
          });
        })
      )
      .subscribe((medicos) => {
        this.medicos = medicos;
        this.listaMedicosAtualizada.next([...this.medicos]);
      });
  }

  getListaDeMedicosAtualizadaObservable() {
    return this.listaMedicosAtualizada.asObservable();
  }

  adicionarMedico(
    id: string,
    nome: string,
    sexo: string,
    dtnasc: string,
    email: string,
    fone: string,
    cpf: string,
    espec: string,
    crm: string,
    senha: string,
    senhaconf: string
  ) {
    const medico: Medico = {
      id: id,
      nome: nome,
      sexo: sexo,
      dtnasc: dtnasc,
      email: email,
      fone: fone,
      cpf: cpf,
      espec: espec,
      crm: crm,
      senha: senha,
      senhaconf: senhaconf,
    };
    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/api/medicos',
        medico
      )
      .subscribe((dados) => {
        medico.id = dados.id;
        this.medicos.push(medico);
        this.listaMedicosAtualizada.next([...this.medicos]);
      });
  }

  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post<{ token: string }>('http://localhost:3000/loginMedico', authData)
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          this.medAutenticado = true;
          this.authStatusSubject.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    this.router.navigate(['/']);
  }
}
