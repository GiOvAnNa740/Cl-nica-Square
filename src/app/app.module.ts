import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuCliComponent } from './menu-cli/menu-cli.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SignComponent } from './sign/sign.component';
import { SobreComponent } from './sobre/sobre.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AgendaComponent } from './agenda/agenda.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { UsuarioService } from './usuarios/usuario.service';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    MenuCliComponent,
    HomeComponent,
    MenuComponent,
    SignComponent,
    SobreComponent,
    CadastroComponent,
    AgendaComponent,
    UsuarioInserirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    HttpClientModule,
    FormsModule,
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
