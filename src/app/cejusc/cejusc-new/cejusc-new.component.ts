import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cejusc } from '../../models/cejusc.model';
import { CejuscService } from '../../services/cejusc.service';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-cejusc-new',
  templateUrl: './cejusc-new.component.html',
  styleUrls: ['./cejusc-new.component.scss']
})
export class CejuscNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;
  status: boolean;
  date = new Date();
  shared: SharedService;
  message: {};
  ano = this.date.getFullYear();
  currentMes = this.date.getMonth();
  cejusc = new Cejusc(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes), null, null);

  constructor(private cejuscService: CejuscService,
  private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar) {
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
          
        }
      );
  }

  register() {
    this.message = {};
    this.cejuscService.createOrUpdate(this.cejusc).subscribe((responseApi: ResponseApi) => {
        this.cejusc = new Cejusc(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes), null, null);
        const cejuscRet: Cejusc = responseApi.data;
        this.form.resetForm();
        this.status = true;
        this.router.navigate(['/cejusc']);
      this.openSnackBar(`Entrada ${cejuscRet.mes}/${cejuscRet.ano} registrada com sucesso!`, 'Ok', this.status)  
      }, 
        err => {
        this.status = false;
        this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
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

  openSnackBar(message: string, action: string, status: boolean) {
    let config = new MatSnackBarConfig();
    config.duration = 7000;
    if (this.status==true){
    config.panelClass = ['ok-Snackbar']
    }else{
    config.panelClass = ['errSnackbar']  
    }
    this.snackBar.open(message, action, config);
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty,
    };
  }

}
