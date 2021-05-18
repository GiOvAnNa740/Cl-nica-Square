import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();

  constructor(private httpClient: HttpClient,private router: Router) {}


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
    const usuario: Usuario = { id, nome, sexo,dtnasc, email, fone, cpf, senha, senhaconf };
    this.httpClient
      .put(`http://localhost:3000/api/usuarios/${id}`, usuario)
      .subscribe((res => {
        const copia = [...this.usuarios];
        const indice = copia.findIndex (us => us.id === usuario.id);
        copia[indice] = usuario;
        this.usuarios = copia;
        this.listaUsuariosAtualizada.next([...this.usuarios]);
        this.router.navigate(['/'])
        }));
  }

  getUsuario(idUsuario: string) {
    return this.httpClient.get<{
      _id: string;
      nome: string,
      sexo: string,
      dtnasc: string,
      email: string,
      fone: string,
      cpf: string,
      senha: string,
      senhaconf: string
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
        this.router.navigate(['/'])
      });
  }
}
