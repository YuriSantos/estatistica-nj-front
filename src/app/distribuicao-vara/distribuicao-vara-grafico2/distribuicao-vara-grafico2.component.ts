import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoVara} from '../../models/distribuicao-vara.model';
import {Router} from '@angular/router';
import {DistribuicaoVaraService} from '../../services/distribuicao-vara.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

@Component({
  selector: 'app-distribuicao-vara-grafico2',
  templateUrl: './distribuicao-vara-grafico2.component.html',
  styleUrls: ['./distribuicao-vara-grafico2.component.scss']
})
export class DistribuicaoVaraGrafico2Component implements OnInit {
  shared: SharedService;
  listDistVara: DistribuicaoVara;
  distVara: DistribuicaoVara[];
  dataGrafico = [];
  displayedColumns: string[] = ['Distribuidos', 'Arquivados', 'Migrados para o PJE', 'Total'] ;
  Tabela = [];
  ano;
  mes;
  mesNome: string;
  porcentagem1: number;
  porcentagem2: number;
  porcentagem3: number;

  constructor(private router: Router,
              private distribuicaoVaraService: DistribuicaoVaraService,
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
    this.distribuicaoVaraService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistVara = responseApi.data;
        this.porcentagem1 = (this.listDistVara.eletronicoArquivado / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.porcentagem2 = (this.listDistVara.eletronicoDistribuido / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.porcentagem3 = (this.listDistVara.processosMigrados / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.dataGrafico = [this.listDistVara.eletronicoArquivado, this.listDistVara.eletronicoDistribuido,
          this.listDistVara.processosMigrados];
        this.Tabela = [{
          eletronicoArquivado: this.listDistVara.eletronicoArquivado + ' (' + this.porcentagem1.toFixed(2) + '%)',
          eletronicoDistribuido: this.listDistVara.eletronicoDistribuido  + ' (' + this.porcentagem2.toFixed(2) + '%)',
          processosMigrados: this.listDistVara.processosMigrados  + ' (' + this.porcentagem2.toFixed(2) + '%)',
          total: (this.listDistVara.eletronicoArquivado + this.listDistVara.eletronicoDistribuido)
        }];
      });
  }

  findMesAno(ano: number, mes: number) {
    this.distribuicaoVaraService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistVara = responseApi.data;
        if (responseApi.data == null) {
          this.listDistVara = new DistribuicaoVara(0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0);
          this.porcentagem1 = 0;
          this.porcentagem2 = 0;
          this.porcentagem3 = 0;
        }
        this.porcentagem1 = (this.listDistVara.eletronicoArquivado / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.porcentagem2 = (this.listDistVara.eletronicoDistribuido / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.porcentagem3 = (this.listDistVara.processosMigrados / (this.listDistVara.eletronicoArquivado +
          this.listDistVara.eletronicoDistribuido + this.listDistVara.processosMigrados)) * 100;
        this.dataGrafico = [this.listDistVara.eletronicoArquivado, this.listDistVara.eletronicoDistribuido,
          this.listDistVara.processosMigrados];
        this.Tabela = [{
          eletronicoArquivado: this.listDistVara.eletronicoArquivado + ' (' + this.porcentagem1.toFixed(2) + '%)',
          eletronicoDistribuido: this.listDistVara.eletronicoDistribuido  + ' (' + this.porcentagem2.toFixed(2) + '%)',
          processosMigrados: this.listDistVara.processosMigrados  + ' (' + this.porcentagem2.toFixed(2) + '%)',
          total: (this.listDistVara.eletronicoArquivado + this.listDistVara.eletronicoDistribuido)
        }];
      });
  }
// Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Eletronico Arquivado', 'Eletronico Distribuido', 'Processos Migrados para o PJE'];
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

