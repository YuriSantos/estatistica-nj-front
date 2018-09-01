import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistribuicaoVara } from '../../models/distribuicao-vara.model';
import { SharedService } from '../../services/shared.service';
import { DistribuicaoVaraService } from '../../services/distribuicao-vara.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-distribuicao-vara-new',
  templateUrl: './distribuicao-vara-new.component.html',
  styleUrls: ['./distribuicao-vara-new.component.scss']
})
export class DistribuicaoVaraNewComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    distribuicaoVara = new DistribuicaoVara(0,0,0,0,0,0,0,0,0,0);
    shared: SharedService;
    classCss: {};
    message: {};

    constructor(private distribuicaoVaraService: DistribuicaoVaraService,
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
      this.distribuicaoVaraService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.distribuicaoVara = responseApi.data;
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
      this.distribuicaoVaraService.createOrUpdate(this.distribuicaoVara).subscribe((responseApi: ResponseApi) => {
          this.distribuicaoVara = new DistribuicaoVara(0,0,0,0,0,0,0,0,0,0);
          const distribuicaoVaraRet: DistribuicaoVara = responseApi.data;
          this.form.resetForm();
          this.showMessage({
            type: 'success',
            text: `Registerd ${distribuicaoVaraRet.mes} successfully`
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
      }
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
