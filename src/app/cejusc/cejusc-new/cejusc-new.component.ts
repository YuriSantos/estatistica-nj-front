import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cejusc } from '../../models/cejusc.model';
import { CejuscService } from '../../services/cejusc.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-cejusc-new',
  templateUrl: './cejusc-new.component.html',
  styleUrls: ['./cejusc-new.component.scss']
})
export class CejuscNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  date = new Date();
  shared: SharedService;
  classCss: {};
  message: {};
  ano = this.date.getFullYear();
  currentMes = this.date.getMonth();
  cejusc = new Cejusc(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes), null, null);

  constructor(private cejuscService: CejuscService,
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
    this.cejuscService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.cejusc = responseApi.data;
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
    this.cejuscService.createOrUpdate(this.cejusc).subscribe((responseApi: ResponseApi) => {
        this.cejusc = new Cejusc(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes), null, null);
        const cejuscRet: Cejusc = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Entrada ${cejuscRet.mes}/${cejuscRet.ano} registrada com sucesso!`
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
