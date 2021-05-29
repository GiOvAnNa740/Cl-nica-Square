import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicoService } from './medico.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private medicoService: MedicoService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.medicoService.getToken();
    const copia = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(copia);
  }
}
