import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MandadoDistribuido } from '../../models/mandado-distribuido.model';
import { SharedService } from '../../services/shared.service';
import { MandadoDistribuidoService } from '../../services/mandado-distribuido.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-mandado-distribuido-new',
  templateUrl: './mandado-distribuido-new.component.html',
  styleUrls: ['./mandado-distribuido-new.component.scss']
})
export class MandadoDistribuidoNewComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    shared: SharedService;
    classCss: {};
    message: {};
    date = new Date();
    ano = this.date.getFullYear();
    currentMes = this.date.getMonth();
    mandadoDistribuido = new MandadoDistribuido(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
      null,
      null,
      null,
      null,
      null,
      null);


  constructor(private mandadoDistribuidoService: MandadoDistribuidoService,
    private route: ActivatedRoute,
    private router: Router) {
    this.shared = SharedService.getInstance();
    }

    ngOnInit() {
      const id: number = this.route.snapshot.params['id'];
      if (id !== undefined) {
        this.findById(id);
    }
  }

    findById(id: number) {
      this.mandadoDistribuidoService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.mandadoDistribuido = responseApi.data;
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
      this.mandadoDistribuidoService.createOrUpdate(this.mandadoDistribuido).subscribe((responseApi: ResponseApi) => {
          this.mandadoDistribuido = new MandadoDistribuido(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
            null,
            null,
            null,
            null,
            null,
            null);
          const mandadoDistribuidoRet: MandadoDistribuido = responseApi.data;
          this.form.resetForm();
          this.router.navigate(['/mandado']);
          this.showMessage({
            type: 'success',
            text: `Entrada ${mandadoDistribuidoRet.mes}/${mandadoDistribuidoRet.ano} registrada com sucesso!`
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
