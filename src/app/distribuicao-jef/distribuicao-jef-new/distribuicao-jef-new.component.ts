import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistribuicaoJef } from '../../models/distribuicao-jef.model';
import { SharedService } from '../../services/shared.service';
import { DistribuicaoJefService } from '../../services/distribuicao-jef.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-distribuicao-jef-new',
  templateUrl: './distribuicao-jef-new.component.html',
  styleUrls: ['./distribuicao-jef-new.component.scss']
})
export class DistribuicaoJefNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

    shared: SharedService;
    classCss: {};
    message: {};
    date = new Date();
    ano = this.date.getFullYear();
    currentMes = this.date.getMonth();
    distribuicaoJef = new DistribuicaoJef(null, this.getLastYear(this.ano),
      this.getJaneiro(this.currentMes),
      null,
      null,
      null,
      null,
      null,
      null,
      null);


  constructor(private distribuicaoJefService: DistribuicaoJefService,
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
      this.distribuicaoJefService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.distribuicaoJef = responseApi.data;
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
      this.distribuicaoJefService.createOrUpdate(this.distribuicaoJef).subscribe((responseApi: ResponseApi) => {
          this.distribuicaoJef = new DistribuicaoJef(null, this.getLastYear(this.ano),
            this.getJaneiro(this.currentMes),
            null,
            null,
            null,
            null,
            null,
            null,
            null);
          const distribuicaoJefRet: DistribuicaoJef = responseApi.data;
          this.form.resetForm();
          this.showMessage({
            type: 'success',
            text: `Registerd ${distribuicaoJefRet.mes} successfully`
          });
        }, err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
      });
        }
      );
    }

  getJaneiro (mes: number) {
    if (mes === 0) {
      this.currentMes = 12;
    }
    return this.currentMes;
  }

  getLastYear (ano: number) {
    if (this.getJaneiro(this.currentMes) === 12 ) {
      this.ano = this.ano - 1;
    }
    return this.ano;
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
