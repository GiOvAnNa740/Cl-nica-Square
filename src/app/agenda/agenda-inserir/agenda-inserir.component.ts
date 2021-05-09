import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgendaService } from '../agenda.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-agenda-inserir',
  templateUrl: './agenda-inserir.component.html',
  styleUrls: ['./agenda-inserir.component.css']
})
export class AgendaInserirComponent {
  constructor(public agendaService: AgendaService) {}

  onAdicionarAgenda(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.agendaService.adicionarAgenda(
      form.value.id,
      form.value.title,
      form.value.date,
      form.value.hora,
      form.value.medico,
      form.value.paciente,
      form.value.espec
    )

    form.resetForm();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'Giovanna - 13:00', date: '2021-05-06' },
      { title: 'Bianca - 12:00', date: '2021-05-10' },
      { title: 'Gabriel - 9:00', date: '2021-04-30' },
      { title: 'Maria - 8:00', date: '2021-05-19' },
      { title: 'José - 9:00', date: '2021-05-19' },
      { title: 'Pedro - 12:00', date: '2021-05-19' },
      { title: 'Julia - 10:00', date: '2021-05-17' },
      { title: 'Marco - 9:00', date: '2021-05-27' },
    ],
  };

}
