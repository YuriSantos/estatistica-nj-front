import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { CejuscService } from '../services/cejusc.service';
import { DialogService } from '../services/dialog.service';
import { ResponseApi } from '../models/response-api';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { Cejusc } from '../models/cejusc.model';

@Component({
  selector: 'app-cejusc',
  templateUrl: './cejusc.component.html',
  styleUrls: ['./cejusc.component.scss']
})
export class CejuscComponent implements OnInit {
  page = 0;
  count = 800;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listCejusc:  Cejusc[];
  displayedColumns: string[] = ['Ano', 'Mes', 'Acordo', 'Sem Acordo', 'Botões'];
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;


  dataSource = new MatTableDataSource<Cejusc>();
  constructor(private router: Router,
  private cejuscService: CejuscService,
  private dialogService: DialogService) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.cejuscService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listCejusc = responseApi['data']['content'];
        this.length = responseApi['data']['totalElements'];
        this.pages = new Array(responseApi['data']['totalPages']);
        this.pageEvent.
        this.dataSource.data = this.listCejusc;
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
            this.cejuscService.delete(id).subscribe((responseApi: ResponseApi) => {
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
