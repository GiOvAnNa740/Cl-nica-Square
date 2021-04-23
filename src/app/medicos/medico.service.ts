import { Injectable } from '@angular/core';
import { Medico } from './medico.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class MedicoService {
  private medicos: Medico[] = [];
  private listaMedicosAtualizada = new Subject<Medico[]>();

  constructor(private httpClient: HttpClient){

  }

  getMedicos(): void {
      this.httpClient.get <{mensagem: string, medicos: any}>('http://localhost:3000/api/medicos')
        .pipe(map((dados) => {
          return dados.medicos.map((medico:any) => {
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
              senhaconf: medico.senhaconf
            }
          })
        }))
        .subscribe(
          (medicos) => {
            this.medicos = medicos;
            this.listaMedicosAtualizada.next([...this.medicos]);
          }
        )
  }

  getListaDeMedicosAtualizadaObservable(){
    return this.listaMedicosAtualizada.asObservable();
  }

  adicionarMedico(id: string, nome:string, sexo:string, dtnasc:string, email: string, fone:string, cpf:string, espec:string, crm:string, senha:string, senhaconf:string){
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
      senhaconf: senhaconf
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/medicos',
    medico).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          this.medicos.push(medico);
          this.listaMedicosAtualizada.next([...this.medicos]);
        }
      )
  }
}
