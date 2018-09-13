import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { SharedService } from '../../services/shared.service';
import { UsuarioService } from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.scss']
})
export class UsuarioNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;
  status: boolean;
  usuario = new Usuario(null, null, null, null);
  shared: SharedService;
  classCss: {};
  message: {};
  hide = true;

  constructor(private usuarioService: UsuarioService,
  private route: ActivatedRoute,
  private router: Router,
    public snackBar: MatSnackBar) {
  this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
  }
  }

  findById(id: number) {
    this.usuarioService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.usuario = responseApi.data;
        }, err => {
        this.status = false;
        this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
        }
      );
  }

  register() {
    this.message = {};
    this.usuarioService.createOrUpdate(this.usuario).subscribe((responseApi: ResponseApi) => {
        this.usuario = new Usuario(null, null, null, null);
        const usuarioRet: Usuario = responseApi.data;
        this.form.resetForm();
        this.status = true;
        this.router.navigate(['/usuario']);
        this.openSnackBar(`Usuário ${usuarioRet.login} registrado com sucesso.`, 'Ok', this.status);
      },
      err => {
        this.status = false;
        this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
      }
    );
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
