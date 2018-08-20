import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { MandadoDistribuidoService } from '../services/mandado-distribuido.service';
import { DialogService } from '../services/dialog.service';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-mandado-distribuido',
  templateUrl: './mandado-distribuido.component.html',
  styleUrls: ['./mandado-distribuido.component.scss']
})
export class MandadoDistribuidoComponent implements OnInit {
  page: number=0;
  count: number=5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listMandadoDistribuido = [];

  constructor(private router: Router,
  private mandadoDistribuidoService: MandadoDistribuidoService,
  private dialogService: DialogService) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.mandadoDistribuidoService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listMandadoDistribuido = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
      },
        err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
        });
  }

  edit(id: string) {
    this.router.navigate(['/mandado-novo', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Do yoy want do delete de user?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.mandadoDistribuidoService.delete(id).subscribe((responseApi: ResponseApi) => {
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
