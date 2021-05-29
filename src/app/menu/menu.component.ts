import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';
import { MedicoService } from '../medicos/medico.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private authObserver: Subscription;
  private authObserverM: Subscription;
  public autenticado: boolean = false;
  public medAutenticado: boolean = false;
  constructor(private usuarioService: UsuarioService, private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.authObserver = this.usuarioService
      .getStatusSubject()
      .subscribe((autenticado) => {
        this.autenticado = autenticado;
      });
    this.authObserverM = this.medicoService
      .getStatusSubject()
      .subscribe((medAutenticado) => {
        this.medAutenticado = medAutenticado;
      });
  }
  ngOnDestroy() {
    this.authObserver.unsubscribe();
    this.authObserverM.unsubscribe();
  }
  onLogout() {
    this.usuarioService.logout();
    this.medicoService.logout();
  }
}
