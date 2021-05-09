import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgendaService } from './agenda.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
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
    );

    form.resetForm();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'Nutrição - Bianca', date: '2021-05-06' },
      { title: 'Psiquiatria - Marcio', date: '2021-05-09' },
      { title: 'Retorno - Bianca', date: '2021-05-23' },
    ],
  };
}
