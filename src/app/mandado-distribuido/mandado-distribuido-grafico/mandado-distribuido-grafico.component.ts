import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MandadoDistribuido} from '../../models/mandado-distribuido.model';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {MandadoDistribuidoService} from '../../services/mandado-distribuido.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

@Component({
  selector: 'app-mandado-distribuido-grafico',
  templateUrl: './mandado-distribuido-grafico.component.html',
  styleUrls: ['./mandado-distribuido-grafico.component.scss']
})
export class MandadoDistribuidoGraficoComponent implements OnInit {
  shared: SharedService;
  listMandado: MandadoDistribuido;
  mandado: MandadoDistribuido[];
  dataGrafico = [];
  displayedColumns: string[] = ['Físico', 'PJE', 'Total'];
  Tabela = [];
  ano;
  mes;
  mesNome: string;
  porcentagem1: number;
  porcentagem2: number;

  constructor(private router: Router,
              private mandadoService: MandadoDistribuidoService,
              private srcBarService: SrcBarService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    const date = new Date();
    this.findAno(date.getFullYear());
    this.srcBarService.anoDisparado.subscribe(
      (ano: number) => {
        this.ano = ano;
      }
    );
    this.srcBarService.mesDisparado.subscribe(
      (mes: number) => {
        this.mes = mes;
        if (mes !== null && mes !== undefined) {
          this.findMesAno(this.ano, this.mes);
        } else {
          this.findAno(this.ano);
        }
      }
    );
    this.srcBarService.mesNomeDisparo.subscribe(
      (mesNome: string) => {
        this.mesNome = mesNome;
      }
    );
  }

  findAno(ano: number) {
    this.mandadoService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listMandado = responseApi.data;
        this.porcentagem1 = ((this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16) / (this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16 + this.listMandado.pje)) * 100;
        this.porcentagem2 = (this.listMandado.pje / (this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16 + this.listMandado.pje)) * 100;
        this.dataGrafico = [(this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16), this.listMandado.pje];
          this.Tabela = [{
            mandadosFisicos: (this.listMandado.vara1 +
              this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
              this.listMandado.vara16) + ' (' + this.porcentagem1.toFixed(2) + '%)',
            PJE: this.listMandado.pje + ' (' + this.porcentagem2.toFixed(2) + '%)',
            total: (this.listMandado.vara1 +
              this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
              this.listMandado.vara16 + this.listMandado.pje)
          }];
      });
  }

  findMesAno(ano: number, mes: number) {
    this.mandadoService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listMandado = responseApi.data;
        if (responseApi.data == null) {
          this.listMandado = new MandadoDistribuido(0, 0, 0,
            0, 0, 0, 0,
            0, 0);
          this.porcentagem1 = 0;
          this.porcentagem2 = 0;
        }
        this.porcentagem1 = ((this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16) / (this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16 + this.listMandado.pje)) * 100;
        this.porcentagem2 = (this.listMandado.pje / (this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16 + this.listMandado.pje)) * 100;
        this.dataGrafico = [(this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16), this.listMandado.pje];
        this.Tabela = [{
          mandadosFisicos: (this.listMandado.vara1 +
            this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
            this.listMandado.vara16) + ' (' + this.porcentagem1.toFixed(2) + '%)',
          PJE: this.listMandado.pje + ' (' + this.porcentagem2.toFixed(2) + '%)',
          total: (this.listMandado.vara1 +
            this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
            this.listMandado.vara16 + this.listMandado.pje)
        }];
      });
  }
// Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Físico', 'PJE'];
  // tslint:disable-next-line:member-ordering
  public pieChartData: number[] = [300, 500];
  // tslint:disable-next-line:member-ordering
  public pieChartType = 'pie';
  // tslint:disable-next-line:member-ordering
  public coresGrafico: Array<any> = [
    { // first color
      backgroundColor: ['#00a7e1', '#003459', '#FAC05E']
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

