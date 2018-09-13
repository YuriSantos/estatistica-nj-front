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
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-contadoria-jef-new',
  templateUrl: './contadoria-jef-new.component.html',
  styleUrls: ['./contadoria-jef-new.component.scss']
})
export class ContadoriaJefNewComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;

  shared: SharedService;
  status: boolean;
  date = new Date();
  ano = this.date.getFullYear();
  currentMes = this.date.getMonth();
  contadoriaJef = new ContadoriaJef(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
    null, null);


  constructor(private contadoriaJefService: ContadoriaJefService,
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
    this.contadoriaJefService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.contadoriaJef = responseApi.data;
        }, err => {
        this.status = false;
        this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
        }
      );
  }

  register() {
    console.log('token: ' + this.shared.token);
    this.contadoriaJefService.createOrUpdate(this.contadoriaJef).subscribe((responseApi: ResponseApi) => {
      this.contadoriaJef = new ContadoriaJef(null, this.getLastYear(this.ano),
        this.getJaneiro(this.currentMes),
        null, null);
        const contadoriaJefRet: ContadoriaJef = responseApi.data;
        this.form.resetForm();
        this.status = true;
        this.router.navigate(['/contjef']);
        this.openSnackBar(`Entrada ${contadoriaJefRet.mes}/${contadoriaJefRet.ano} registrada com sucesso!`, 'Ok', this.status);
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
    const config = new MatSnackBarConfig();
    config.duration = 7000;
    if (this.status === true) {
      config.panelClass = ['ok-Snackbar'];
    } else {
      config.panelClass = ['errSnackbar'];
    }
    this.snackBar.open(message, action, config);
  }

}
