import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Usuario } from '../models/usuario.model';
import { MatTableDataSource } from '@angular/material';
import { DialogService } from '../services/dialog.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUsuario: Usuario[];
  displayedColumns: string[] = ['Usuário', 'Perfil'];

  dataSource = new MatTableDataSource<Usuario>();

  constructor(
    private dialogService: DialogService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.usuarioService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listUsuario = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
        this.dataSource.data = this.listUsuario;
      },
        err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
        });
  }

  edit(id: number) {
    this.router.navigate(['/user-new', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Do yoy want do delete de user?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.usuarioService.delete(id).subscribe((responseApi: ResponseApi) => {
              this.showMessage({
                type: 'success',
                text: 'Record deleted'
              });
              this.findAll(this.page, this.count);
            }, err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
              }
            );
          }
      }

      );
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
      this.page = i;
      this.findAll(this.page, this.count);
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
    }
    this.classCss['alert-' +  type] = true;
  }

}
