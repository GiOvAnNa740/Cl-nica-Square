import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private authObserver: Subscription;
  public autenticado: boolean = false;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.authObserver = this.usuarioService
      .getStatusSubject()
      .subscribe((autenticado) => {
        this.autenticado = autenticado;
      });
  }
  ngOnDestroy() {
    this.authObserver.unsubscribe();
  }
  onLogout() {
    this.usuarioService.logout();
  }
}
