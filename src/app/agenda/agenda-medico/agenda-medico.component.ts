import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-agenda-medico',
  templateUrl: './agenda-medico.component.html',
  styleUrls: ['./agenda-medico.component.css']
})
export class AgendaMedicoComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      { title: 'Giovanna - 13:00', date: '2021-05-06'},
      { title: 'Bianca - 12:00', date: '2021-05-10'},
      { title: 'Gabriel - 9:00', date: '2021-04-30'},
      { title: 'Maria - 8:00', date: '2021-05-19'},
      { title: 'José - 9:00', date: '2021-05-19'},
      { title: 'Pedro - 12:00', date: '2021-05-19'},
      { title: 'Julia - 10:00', date: '2021-05-17'},
      { title: 'Marco - 9:00', date: '2021-05-27'},

    ]
  };


}
