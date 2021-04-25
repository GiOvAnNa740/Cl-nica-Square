import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

//mat
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

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
import { MedicoInserirComponent } from './medicos/medico-inserir/medico-inserir.component';
import { MedicoListaComponent } from './medicos/medico-lista/medico-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    UsuarioInserirComponent,
    MedicoInserirComponent,
    MedicoListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule { }
