import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DistribuicaoJef } from '../../models/distribuicao-jef.model';
import { SharedService } from '../../services/shared.service';
import { DistribuicaoJefService } from '../../services/distribuicao-jef.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-distribuicao-jef-new',
  templateUrl: './distribuicao-jef-new.component.html',
  styleUrls: ['./distribuicao-jef-new.component.scss']
})
export class DistribuicaoJefNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

    shared: SharedService;
    status: boolean;
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
      this.distribuicaoJefService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.distribuicaoJef = responseApi.data;
          }, err => {
          this.status = false;
          this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
          }
        );
    }

    register() {
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
          this.router.navigate(['/distjef']);
          this.openSnackBar(`Entrada ${distribuicaoJefRet.mes}/${distribuicaoJefRet.ano} registrada com sucesso!`, 'Ok', this.status);
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
