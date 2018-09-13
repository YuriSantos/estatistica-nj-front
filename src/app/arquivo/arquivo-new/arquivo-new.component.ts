import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Arquivo } from '../../models/arquivo.model';
import { SharedService } from '../../services/shared.service';
import { ArquivoService } from '../../services/arquivo.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-arquivo-new',
  templateUrl: './arquivo-new.component.html',
  styleUrls: ['./arquivo-new.component.scss']
})
export class ArquivoNewComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;

  shared: SharedService;
  status: boolean;
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
    this.arquivoService.findById(id)
    .subscribe((responseApi: ResponseApi)  => {
          this.arquivo = responseApi.data;
        }, err => {
        this.status = false;
        this.openSnackBar(err['error']['errors'][0], 'Ok', this.status);
        }
      );
  }

  register() {
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
        this.router.navigate(['/arquivo']);
        this.openSnackBar(`Entrada ${arquivoRet.mes}/${arquivoRet.ano} registrada com sucesso!`, 'Ok', this.status);
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
