import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arquivo } from '../../models/arquivo.model';
import { SharedService } from '../../services/shared.service';
import { ArquivoService } from '../../services/arquivo.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-arquivo-new',
  templateUrl: './arquivo-new.component.html',
  styleUrls: ['./arquivo-new.component.scss']
})
export class ArquivoNewComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;

  shared: SharedService;
  classCss: {};
  message: {};
  date = new Date();
  ano = this.date.getFullYear();
  currentMes = this.date.getMonth();
  arquivo = new Arquivo(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
    null,
    null,
    null,
    null,
    null,
    null,
    null);


  constructor(private arquivoService: ArquivoService,
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
    this.arquivoService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.arquivo = responseApi.data;
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
    this.arquivoService.createOrUpdate(this.arquivo).subscribe((responseApi: ResponseApi) => {
      this.arquivo = new Arquivo(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
        null,
        null,
        null,
        null,
        null,
        null,
        null);
        const arquivoRet: Arquivo = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Entrada ${arquivoRet.mes}/${arquivoRet.ano} registrada com sucesso!`
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
