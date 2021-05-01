import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'Nutrição - Bianca', date: '2021-04-06'},
      { title: 'Psiquiatria - Marcio', date: '2021-04-09'},
      { title: 'Retorno - Bianca', date: '2021-04-23'},
    ]
  };



}
