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
    locale: 'pt-br'
  };



}
