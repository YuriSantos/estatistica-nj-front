import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { SharedService } from '../services/shared.service';
import { CurrentUser } from '../models/current-user.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  usuario = new Usuario(0, '', '', '');
  shared: SharedService;
  message: string;
  hide = true;

  constructor(private usuarioService: UsuarioService,
  private router: Router) {
  this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  login() {
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.usuario = userAuthentication.usuario;
      this.shared.usuario.profile = this.shared.usuario.profile.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin() {
    this.message = '';
    this.usuario = new Usuario(0, '', '', '');
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty,
    };
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Você deve digitar um usuário.' :
        this.email.hasError('email') ? 'Não é um usuário válido.' :
            '';
  }

}
