import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-login-medico',
  templateUrl: './login-medico.component.html',
  styleUrls: ['./login-medico.component.css']
})
export class LoginMedicoComponent implements OnInit {

  constructor(private medicoService: MedicoService) { }

  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.medicoService.login(form.value.email, form.value.senha);
  }

  ngOnInit(): void {
  }

}
