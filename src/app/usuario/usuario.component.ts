import {Component, OnInit, ViewChild} from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Usuario } from '../models/usuario.model';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page = 0;
  count = 360;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUsuario: Usuario[];
  displayedColumns: string[] = ['Usuário', 'Perfil'];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  dataSource = new MatTableDataSource<Usuario>();

  constructor(
    private dialogService: DialogService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.usuarioService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listUsuario = responseApi['data']['content'];
        this.length = responseApi['data']['totalElements'];
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
