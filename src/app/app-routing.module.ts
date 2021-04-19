import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SobreComponent } from './sobre/sobre.component';
import {CadastroComponent} from './cadastro/cadastro.component';
import {UsuarioInserirComponent} from './usuarios/usuario-inserir/usuario-inserir.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'sobre', component:SobreComponent},
  {path: 'sign', component:SignComponent},
  {path: 'agenda', component:AgendaComponent},
  {path: 'cadastro', component:CadastroComponent},
  {path: 'usuario', component:UsuarioInserirComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
