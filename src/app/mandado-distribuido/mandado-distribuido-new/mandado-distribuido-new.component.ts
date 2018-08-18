import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MandadoDistribuido } from '../../models/mandado-distribuido.model';
import { SharedService } from '../../services/shared.service';
import { MandadoDistribuidoService } from '../../services/mandado-distribuido.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';

@Component({
  selector: 'app-mandado-distribuido-new',
  templateUrl: './mandado-distribuido-new.component.html',
  styleUrls: ['./mandado-distribuido-new.component.scss']
})
export class MandadoDistribuidoNewComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;

    mandadoDistribuido = new MandadoDistribuido(0,0,0,0,0,0,0,0,0);
    shared: SharedService;
    classCss: {};
    message: {};

    constructor(private mandadoDistribuidoService: MandadoDistribuidoService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
    }

    ngOnInit() {
      const id: number = this.route.snapshot.params['id'];
      if (id !== 0) {
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
      console.log('token: ' + this.shared.token);
      this.mandadoDistribuidoService.createOrUpdate(this.mandadoDistribuido).subscribe((responseApi: ResponseApi) => {
          this.mandadoDistribuido = new MandadoDistribuido(0,0,0,0,0,0,0,0,0);
          const mandadoDistribuidoRet: MandadoDistribuido = responseApi.data;
          this.form.resetForm();
          this.showMessage({
            type: 'success',
            text: `Registerd ${mandadoDistribuidoRet.mes} successfully`
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
