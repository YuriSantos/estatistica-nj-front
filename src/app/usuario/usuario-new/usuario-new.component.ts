import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { SharedService } from '../../services/shared.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.scss']
})
export class UsuarioNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  usuario = new Usuario(0, '', '', '');
  shared: SharedService;
  classCss: {};
  message: {};

  constructor(private usuarioService: UsuarioService,
  private route: ActivatedRoute) {
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
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        }
      );
  }

  register() {
    this.message = {};
    this.usuarioService.createOrUpdate(this.usuario).subscribe((responseApi: ResponseApi) => {
        this.usuario = new Usuario(0, '', '', '');
        const usuarioRet: Usuario = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registrado ${usuarioRet.login} com sucesso.`
        });
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
    });
      }
    );
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 6000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' +  type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty,
    };
  }

  }
