import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SobreComponent } from './sobre/sobre.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { MedicoInserirComponent } from './medicos/medico-inserir/medico-inserir.component';
import { MedicoListaComponent } from './medicos/medico-lista/medico-lista.component';
import { AgendaMedicoComponent } from './agenda/agenda-medico/agenda-medico.component';
import { AgendaInserirComponent } from './agenda/agenda-inserir/agenda-inserir.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'sobre', component:SobreComponent},
  {path: 'sign', component:SignComponent},
  {path: 'agenda', component:AgendaComponent},
  {path: 'cadastro', component:CadastroComponent},
  {path: 'usuario', component:UsuarioInserirComponent},
  {path: 'usuarioEditar/:idUsuario', component:UsuarioInserirComponent},
  {path: 'medicos', component:MedicoInserirComponent},
  {path: 'medicoEditar/:idMedico', component:MedicoInserirComponent},
  {path: 'medicoLista', component:MedicoListaComponent},
  {path: 'agendaMedico', component:AgendaMedicoComponent},
  {path: 'agendaInserir', component:AgendaInserirComponent},
  {path: 'agendaEditar/:idCliente', component:AgendaInserirComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
