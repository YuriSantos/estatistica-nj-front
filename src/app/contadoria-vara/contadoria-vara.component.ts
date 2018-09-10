import {Component, OnInit, ViewChild} from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { ContadoriaVaraService } from '../services/contadoria-vara.service';
import { DialogService } from '../services/dialog.service';
import { ResponseApi } from '../models/response-api';
import { ContadoriaVara } from '../models/contadiria-vara.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-contadoria-vara',
  templateUrl: './contadoria-vara.component.html',
  styleUrls: ['./contadoria-vara.component.scss']
})
export class ContadoriaVaraComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page = 0;
  count = 360;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listContadoriaVara: ContadoriaVara[];
  displayedColumns: string[] = ['Ano', 'Mes', 'Físico Entrada',
    'Físico Saída',
    'Físico Saldo',
    'Eletrônico Entrada',
    'Eletrônico Saída',
    'Eletrônico Saldo', 'Botões'];

  dataSource = new MatTableDataSource<ContadoriaVara>();
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private router: Router,
  private contadoriaVaraService: ContadoriaVaraService,
  private dialogService: DialogService) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.contadoriaVaraService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listContadoriaVara = responseApi['data']['content'];
        this.length = responseApi['data']['totalElements'];
        this.pages = new Array(responseApi['data']['totalPages']);
        this.dataSource.data = this.listContadoriaVara;
      },
        err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
        });
  }

  edit(id: string) {
    this.router.navigate(['editar', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Você quer realmente deletar o registro?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.contadoriaVaraService.delete(id).subscribe((responseApi: ResponseApi) => {
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
    };
    this.classCss['alert-' +  type] = true;
  }

  }
