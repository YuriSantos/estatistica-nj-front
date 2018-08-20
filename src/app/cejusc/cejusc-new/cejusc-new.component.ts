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

  cejusc = new Cejusc(0,0,0,0,0);
  shared: SharedService;
  classCss: {};
  message: {};

  constructor(private cejuscService: CejuscService,
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
    console.log('token: ' + this.shared.token);
    this.cejuscService.createOrUpdate(this.cejusc).subscribe((responseApi: ResponseApi) => {
        this.cejusc = new Cejusc(0,0,0,0,0);
        const cejuscRet: Cejusc = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registerd ${cejuscRet.mes} successfully`
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
