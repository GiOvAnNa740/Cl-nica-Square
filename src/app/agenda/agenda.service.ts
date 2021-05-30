import { Injectable } from '@angular/core';
import { Agenda } from './agenda.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private agendas: Agenda[] = [];
  private listaAgendasAtualizada = new Subject<Agenda[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  atualizarAgenda(
    id: string,
    date: string,
    hora: string,
    medico: string,
    paciente: string,
    espec: string,
    link:string
  ) {
    const agenda: Agenda = { id, date, hora, medico, paciente, espec, link };
    this.httpClient
      .put(`http://localhost:3000/api/agenda/${id}`, agenda)
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
      link: string;
    }>(`http://localhost:3000/api/agenda/${idAgenda}`);
  }

  getAgendas(): void {
    this.httpClient
      .get<{ mensagem: string; agendas: any }>(
        'http://localhost:3000/api/agenda'
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
              link: agenda.link
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
    espec: string,
    link: string
  ) {
    const agenda: Agenda = {
      id: id,
      date: date,
      hora: hora,
      medico: medico,
      paciente: paciente,
      espec: espec,
      link: link,
    };
    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/api/agenda',
        agenda
      )
      .subscribe((dados) => {
        agenda.id = dados.id;
        this.agendas.push(agenda);
        this.listaAgendasAtualizada.next([...this.agendas]);
        this.router.navigate(['/agendaInserir']);
      });
  }

  removerAgenda(id: string): void {
    this.httpClient
      .delete(`http://localhost:3000/api/agenda/${id}`)
      .subscribe(() => {
        this.agendas = this.agendas.filter((ag) => {
          return ag.id !== id;
        });
        this.listaAgendasAtualizada.next([...this.agendas]);
      });
  }
}
