import { Injectable } from '@angular/core';
import { Agenda } from './agenda.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class AgendaService {
  private agendas: Agenda[] = [];
  private listaAgendasAtualizada = new Subject<Agenda[]>();

  constructor(private httpClient: HttpClient){

  }

  getAgendas(): void {
      this.httpClient.get <{mensagem: string, agendas: any}>('http://localhost:3000/api/agendas')
        .pipe(map((dados) => {
          return dados.agendas.map((agenda:any) => {
            return {
              id: agenda._id,
              title: agenda.title,
              date: agenda.date,
              hora: agenda.hora,
              medico: agenda.medico,
              paciente: agenda.paciente,
              espec: agenda.espec,
            }
          })
        }))
        .subscribe(
          (agendas) => {
            this.agendas = agendas;
            this.listaAgendasAtualizada.next([...this.agendas]);
          }
        )
  }

  getListaDeAgendasAtualizadaObservable(){
    return this.listaAgendasAtualizada.asObservable();
  }

  adicionarAgenda(id: string, title:string, date:string, hora:string, medico: string, paciente:string, espec:string){
    const agenda: Agenda = {
      id: id,
      title: title,
      date: date,
      hora: hora,
      medico: medico,
      paciente: paciente,
      espec: espec
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/agendas',
    agenda).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          this.agendas.push(agenda);
          this.listaAgendasAtualizada.next([...this.agendas]);
        }
      )
  }
}
