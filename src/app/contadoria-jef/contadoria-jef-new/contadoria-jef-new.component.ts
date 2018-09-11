import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { ContadoriaJefService } from '../../services/contadoria-jef.service';
import { DialogService } from '../../services/dialog.service';
import { ResponseApi } from '../../models/response-api';
import { ContadoriaJef } from '../../models/contadoria-jef.model';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contadoria-jef-new',
  templateUrl: './contadoria-jef-new.component.html',
  styleUrls: ['./contadoria-jef-new.component.scss']
})
export class ContadoriaJefNewComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;

  shared: SharedService;
  classCss: {};
  message: {};
  date = new Date();
  ano = this.date.getFullYear();
  currentMes = this.date.getMonth();
  contadoriaJef = new ContadoriaJef(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
    null, null);


  constructor(private contadoriaJefService: ContadoriaJefService,
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
    this.contadoriaJefService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.contadoriaJef = responseApi.data;
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
    console.log('token: ' + this.shared.token);
    this.contadoriaJefService.createOrUpdate(this.contadoriaJef).subscribe((responseApi: ResponseApi) => {
      this.contadoriaJef = new ContadoriaJef(null, this.getLastYear(this.ano),
        this.getJaneiro(this.currentMes),
        null, null);
      console.log('Ano: ' + this.getLastYear(this.ano));
        const contadoriaJefRet: ContadoriaJef = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Entrada ${contadoriaJefRet.mes}/${contadoriaJefRet.ano} registrada com sucesso!`
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
