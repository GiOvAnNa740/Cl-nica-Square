import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgendaService } from '../agenda.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { mimeTypeValidator } from './mime-type.validator';

@Component({
  selector: 'app-agenda-inserir',
  templateUrl: './agenda-inserir.component.html',
  styleUrls: ['./agenda-inserir.component.css'],
})
export class AgendaInserirComponent implements OnInit {
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
        this.agendaService.getAgenda(this.idAgenda).subscribe((dadosMe) => {
          this.agenda = {
            id: dadosMe._id,
            date: dadosMe.date,
            hora: dadosMe.hora,
            medico: dadosMe.medico,
            paciente: dadosMe.paciente,
            espec: dadosMe.espec,
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

  onAdicionarAgenda(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === 'criar') {
      this.agendaService.adicionarAgenda(
        form.value.id,
        form.value.date,
        form.value.hora,
        form.value.medico,
        form.value.paciente,
        form.value.espec
      );
    } else {
      this.agendaService.atualizarAgenda(
        this.idAgenda,
        form.value.date,
        form.value.hora,
        form.value.medico,
        form.value.paciente,
        form.value.espec
      );
    }
    form.reset();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
     // { title: this.form.value.paciente, date: this.form.value.date },
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
