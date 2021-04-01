import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from './agendar/agendar.component';
import { HomeComponent } from './home/home.component';
import { SignComponent } from './sign/sign.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'sobre', component:SobreComponent},
  {path: 'sign', component:SignComponent},
  {path: 'agendar', component:AgendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
