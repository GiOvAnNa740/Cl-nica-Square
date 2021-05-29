import { Injectable } from '@angular/core';
import { Agenda } from './agenda.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private agendas: Agenda[] = [];
  private listaAgendasAtualizada = new Subject<Agenda[]>();

  constructor(private httpClient: HttpClient) {}

  atualizarAgenda(
    id: string,
    date: string,
    hora: string,
    medico: string,
    paciente: string,
    espec: string
  ) {
    const agenda: Agenda = { id, date, hora, medico, paciente, espec };
    this.httpClient
      .put(`http://localhost:3000/api/agendas/${id}`, agenda)
      .subscribe((res) => {
        const copia = [...this.agendas];
        const indice = copia.findIndex((ag) => ag.id === agenda.id);
        copia[indice] = agenda;
        this.agendas = copia;
        this.listaAgendasAtualizada.next([...this.agendas]);
      });
  }

  getAgenda(idAgenda: string) {
    //return { ...this.agendas.find((ag) => ag.id === idAgenda) };
    return this.httpClient.get<{
      _id: string;
      date: string;
      hora: string;
      medico: string;
      paciente: string;
      espec: string;
    }>(`http://localhost:3000/api/agendas/${idAgenda}`);
  }

  getAgendas(): void {
    this.httpClient
      .get<{ mensagem: string; agendas: any }>(
        'http://localhost:3000/api/agendas'
      )
      .pipe(
        map((dados) => {
          return dados.agendas.map((agenda: any) => {
            return {
              id: agenda._id,
              date: agenda.date,
              hora: agenda.hora,
              medico: agenda.medico,
              paciente: agenda.paciente,
              espec: agenda.espec,
            };
          });
        })
      )
      .subscribe((agendas) => {
        this.agendas = agendas;
        this.listaAgendasAtualizada.next([...this.agendas]);
      });
  }

  getListaDeAgendasAtualizadaObservable() {
    return this.listaAgendasAtualizada.asObservable();
  }

  adicionarAgenda(
    id: string,
    date: string,
    hora: string,
    medico: string,
    paciente: string,
    espec: string
  ) {
    const agenda: Agenda = {
      id: id,
      date: date,
      hora: hora,
      medico: medico,
      paciente: paciente,
      espec: espec,
    };
    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/agendaInserir',
        agenda
      )
      .subscribe((dados) => {
        agenda.id = dados.id;
        this.agendas.push(agenda);
        this.listaAgendasAtualizada.next([...this.agendas]);
      });
  }

  removerAgenda(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/agendas/${id}`)
      .subscribe(() => {
        this.agendas = this.agendas.filter((ag) => {
          return ag.id !== id;
        });
        this.listaAgendasAtualizada.next([...this.agendas]);
      });
  }
}
