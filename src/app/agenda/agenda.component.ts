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
  form!: FormGroup;
  //previewImagem: string;

  constructor(
    public agendaService: AgendaService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      fone: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idAgenda')) {
        this.modo = 'agendaEditar';
        this.idAgenda = paramMap.get('idAgenda');
        this.agendaService.getAgenda(this.idAgenda).subscribe((dadosAg) => {
          this.agenda = {
            id: dadosAg._id,
            date: dadosAg.date,
            hora: dadosAg.hora,
            medico: dadosAg.medico,
            paciente: dadosAg.paciente,
            espec: dadosAg.espec,
          };
          this.form.setValue({
            date: this.agenda.date,
            hora: this.agenda.hora,
            medico: this.agenda.medico,
            paciente: this.agenda.paciente,
            espec: this.agenda.espec,
          });
        });
      } else {
        this.modo = 'criar';
        this.idAgenda = null;
      }
    });
  }
  onAdicionarAgenda() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === 'criar') {
      this.agendaService.adicionarAgenda(
        this.form.value.id,
        this.form.value.date,
        this.form.value.hora,
        this.form.value.medico,
        this.form.value.paciente,
        this.form.value.espec
      );
    } else {
      this.agendaService.atualizarAgenda(
        this.idAgenda,
        this.form.value.date,
        this.form.value.hora,
        this.form.value.medico,
        this.form.value.paciente,
        this.form.value.espec
      );
    }

    this.form.reset();
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
