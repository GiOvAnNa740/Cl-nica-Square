import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { Usuario } from './usuarios/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'novo-projeto';
  usuarios: Usuario[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pt-br'
  };



  onUsuarioAdicionado(usuario: Usuario) {
    this.usuarios = [...this.usuarios, usuario];
    console.log(this.usuarios);
  }
}
