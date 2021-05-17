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
        this.agendaService.getAgenda(this.idAgenda).subscribe((dadosMe) => {
          this.agenda = {
            id: dadosMe._id,
            date: dadosMe.date,
            hora: dadosMe.hora,
            medico: dadosMe.medico,
            paciente: dadosMe.paciente,
            espec: dadosMe.espec,
          };
        });
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
