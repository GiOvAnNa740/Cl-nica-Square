import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgendaService } from './agenda.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  private modo = 'criar';
  private idAgenda: any;
  public agenda: any;
  public estaCarregando: boolean = false;
  //form: FormGroup;
  //previewImagem: string;

  constructor(
    public agendaService: AgendaService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idAgenda')) {
        this.modo = 'agendaEditar';
        this.idAgenda = paramMap.get('idCliente');
      } else {
        this.modo = 'agendaInserir';
        this.idAgenda = null;
      }
    });
  }
  onAdicionarAgenda(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.modo === 'agendaInserir') {
      this.agendaService.adicionarAgenda(
        form.value.id,
        form.value.title,
        form.value.date,
        form.value.hora,
        form.value.medico,
        form.value.paciente,
        form.value.espec
      );
    } else {
      this.agendaService.atualizarAgenda(
        this.idAgenda,
        form.value.title,
        form.value.date,
        form.value.hora,
        form.value.medico,
        form.value.paciente,
        form.value.espec
      );
    }

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
