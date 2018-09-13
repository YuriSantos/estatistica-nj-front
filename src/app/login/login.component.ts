import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { SharedService } from '../services/shared.service';
import { CurrentUser } from '../models/current-user.model';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  usuario = new Usuario(null, null, null, null);
  shared: SharedService;
  message: string;
  hide = true;
  status: boolean;

  constructor(private usuarioService: UsuarioService,
  private router: Router,
  public snackBar: MatSnackBar) {
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
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.status = false;
      this.openSnackBar('Login e/ou senha incorretos!', 'Ok', this.status);
      this.message = 'Erro';
    });
  }

  openSnackBar(message: string, action: string, status: boolean) {
    const config = new MatSnackBarConfig();
    config.duration = 7000;
    if (this.status === true) {
      config.panelClass = ['ok-Snackbar'];
    } else {
      config.panelClass = ['errSnackbar'];
    }
    this.snackBar.open(message, action, config);
  }


}
