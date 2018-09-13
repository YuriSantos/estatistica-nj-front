import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistribuicaoVara } from '../../models/distribuicao-vara.model';
import { SharedService } from '../../services/shared.service';
import { DistribuicaoVaraService } from '../../services/distribuicao-vara.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-distribuicao-vara-new',
  templateUrl: './distribuicao-vara-new.component.html',
  styleUrls: ['./distribuicao-vara-new.component.scss']
})
export class DistribuicaoVaraNewComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;
    shared: SharedService;
    status: boolean;
    date = new Date();
    ano = this.date.getFullYear();
    currentMes = this.date.getMonth();
    distribuicaoVara = new DistribuicaoVara(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
  null,
      null,
      null,
      null,
      null,
      null,
      null);


  constructor(private distribuicaoVaraService: DistribuicaoVaraService,
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
      this.distribuicaoVaraService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.distribuicaoVara = responseApi.data;
          }, err => {
          this.status = false;
          this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
          }
        );
    }

    register() {
      this.distribuicaoVaraService.createOrUpdate(this.distribuicaoVara).subscribe((responseApi: ResponseApi) => {
          this.distribuicaoVara = new DistribuicaoVara(null, this.getLastYear(this.ano), this.getJaneiro(this.currentMes),
            null,
            null,
            null,
            null,
            null,
            null,
            null);
          const distribuicaoVaraRet: DistribuicaoVara = responseApi.data;
          this.form.resetForm();
          this.status = true;
          this.router.navigate(['/distvara']);
          this.openSnackBar(`Entrada ${distribuicaoVaraRet.mes}/${distribuicaoVaraRet.ano} registrada com sucesso!`, 'Ok', this.status);
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
