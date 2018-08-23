import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { DistribuicaoJefService } from '../services/distribuicao-jef.service';
import { DialogService } from '../services/dialog.service';
import { ResponseApi } from '../models/response-api';
import { DistribuicaoJef } from '../models/distribuicao-jef.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-distribuicao-jef',
  templateUrl: './distribuicao-jef.component.html',
  styleUrls: ['./distribuicao-jef.component.scss']
})
export class DistribuicaoJefComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listDistribuicaoJef: DistribuicaoJef[];
  displayedColumns: string[] = ['Ano', 'Mes', 'TeleJudiciário', 'Atermação', 'Advogados', 'Processos', 'Recursal', '13a Vara', '7a Vara'];

  dataSource = new MatTableDataSource<DistribuicaoJef>();

  constructor(private router: Router,
  private distribuicaoJefService: DistribuicaoJefService,
  private dialogService: DialogService) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.distribuicaoJefService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistribuicaoJef = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
        this.dataSource.data = this.listDistribuicaoJef;
      },
        err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
        });
  }

  edit(id: string) {
    this.router.navigate(['/distjef-novo', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Do yoy want do delete de user?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.distribuicaoJefService.delete(id).subscribe((responseApi: ResponseApi) => {
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
