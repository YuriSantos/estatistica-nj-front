import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MandadoDistribuido } from '../../models/mandado-distribuido.model';
import { SharedService } from '../../services/shared.service';
import { MandadoDistribuidoService } from '../../services/mandado-distribuido.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-mandado-distribuido-new',
  templateUrl: './mandado-distribuido-new.component.html',
  styleUrls: ['./mandado-distribuido-new.component.scss']
})
export class MandadoDistribuidoNewComponent implements OnInit {

    @ViewChild('form')
    form: NgForm;
    status: boolean;
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
      this.mandadoDistribuidoService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
            this.mandadoDistribuido = responseApi.data;
          }, err => {
          this.status = false;
          this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
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
          this.openSnackBar(`Entrada ${mandadoDistribuidoRet.mes}/${mandadoDistribuidoRet.ano} registrada com sucesso!`, 'Ok', this.status);
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
