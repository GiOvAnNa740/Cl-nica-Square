import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private autenticado: boolean = false;
  private token: any;
  private authStatusSubject = new Subject<boolean>();
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();

  public getToken(): string {
    return this.token;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  atualizarUsuario(
    id: string,
    nome: string,
    sexo: string,
    dtnasc: string,
    email: string,
    fone: string,
    cpf: string,
    senha: string,
    senhaconf: string
  ) {
    const usuario: Usuario = {
      id,
      nome,
      sexo,
      dtnasc,
      email,
      fone,
      cpf,
      senha,
      senhaconf,
    };
    this.httpClient
      .put(`http://localhost:3000/api/usuarios/${id}`, usuario)
      .subscribe((res) => {
        const copia = [...this.usuarios];
        const indice = copia.findIndex((us) => us.id === usuario.id);
        copia[indice] = usuario;
        this.usuarios = copia;
        this.listaUsuariosAtualizada.next([...this.usuarios]);
        this.router.navigate(['/']);
      });
  }

  getUsuario(idUsuario: string) {
    return this.httpClient.get<{
      _id: string;
      nome: string;
      sexo: string;
      dtnasc: string;
      email: string;
      fone: string;
      cpf: string;
      senha: string;
      senhaconf: string;
    }>(`http://localhost:3000/api/usuarios/${idUsuario}`);
  }

  getUsuarios(): void {
    this.httpClient
      .get<{ mensagem: string; usuarios: any }>(
        'http://localhost:3000/api/usuarios'
      )
      .pipe(
        map((dados) => {
          return dados.usuarios.map((usuario: any) => {
            return {
              id: usuario._id,
              nome: usuario.nome,
              sexo: usuario.sexo,
              dtnasc: usuario.dtnasc,
              email: usuario.email,
              fone: usuario.fone,
              cpf: usuario.cpf,
              senha: usuario.senha,
              senhaconf: usuario.senhaconf,
            };
          });
        })
      )
      .subscribe((usuarios) => {
        this.usuarios = usuarios;
        this.listaUsuariosAtualizada.next([...this.usuarios]);
      });
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }

  adicionarUsuario(
    id: string,
    nome: string,
    sexo: string,
    dtnasc: string,
    email: string,
    fone: string,
    cpf: string,
    senha: string,
    senhaconf: string
  ) {
    const authData: AuthData = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post('http://localhost:3000/api/usuarios', authData)
      .subscribe((resposta) => {
        console.log(resposta);
      });
    const usuario: Usuario = {
      id: id,
      nome: nome,
      sexo: sexo,
      dtnasc: dtnasc,
      email: email,
      fone: fone,
      cpf: cpf,
      senha: senha,
      senhaconf: senhaconf,
    };
    this.httpClient
      .post<{ mensagem: string; id: string }>(
        'http://localhost:3000/api/usuarios',
        usuario
      )
      .subscribe((dados) => {
        usuario.id = dados.id;
        this.usuarios.push(usuario);
        this.listaUsuariosAtualizada.next([...this.usuarios]);
        this.router.navigate(['/']);
      });
  }
  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post<{ token: string }>(
        'http://localhost:3000/api/usuarios',
        authData
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.router.navigate(['/'])
        }
      });
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    this.router.navigate(['/'])
  }
}
