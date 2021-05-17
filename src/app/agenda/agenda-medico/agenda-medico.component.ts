import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { AgendaService } from '../agenda.service';
import { Agenda } from '../agenda.model';


@Component({
  selector: 'app-agenda-medico',
  templateUrl: './agenda-medico.component.html',
  styleUrls: ['./agenda-medico.component.css'],
})
export class AgendaMedicoComponent implements OnInit, OnDestroy  {


  agendas:Agenda[] = [];

  private agendasSubscription!: Subscription;


  constructor(public agendaService: AgendaService) {}

  ngOnDestroy(): void {
    this.agendasSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.agendaService.getAgendas();
    this.agendasSubscription = this.agendaService
      .getListaDeAgendasAtualizadaObservable()
      .subscribe((agendas: Agenda[]) => {
        this.agendas = agendas;
      });
  }

  onDelete (id: string): void{
    this.agendaService.removerAgenda(id);
    }
}
