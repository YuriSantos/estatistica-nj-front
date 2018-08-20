import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { ContadoriaJefService } from '../../services/contadoria-jef.service';
import { DialogService } from '../../services/dialog.service';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-contadoria-jef-new',
  templateUrl: './contadoria-jef-new.component.html',
  styleUrls: ['./contadoria-jef-new.component.scss']
})
export class ContadoriaJefNewComponent implements OnInit {
  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listContJef = [];

  constructor(private router: Router,
  private contadoriaJefService: ContadoriaJefService,
  private dialogService: DialogService) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.contadoriaJefService.findAll(page, count)
      .subscribe((responseApi: ResponseApi) => {
        this.listContJef = responseApi['data']['content'];
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
    this.router.navigate(['/contjef-novo', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Do yoy want do delete de user?')
      .then((candelete: boolean) => {
          if (candelete) {
            this.message = {};
            this.contadoriaJefService.delete(id).subscribe((responseApi: ResponseApi) => {
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
