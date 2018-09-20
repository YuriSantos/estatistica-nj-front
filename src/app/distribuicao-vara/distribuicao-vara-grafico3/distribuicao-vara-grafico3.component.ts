import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoVara} from '../../models/distribuicao-vara.model';
import {Router} from '@angular/router';
import {DistribuicaoVaraService} from '../../services/distribuicao-vara.service';
import {SrcBarService} from '../../services/src-bar.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-distribuicao-vara-grafico3',
  templateUrl: './distribuicao-vara-grafico3.component.html',
  styleUrls: ['./distribuicao-vara-grafico3.component.scss']
})
export class DistribuicaoVaraGrafico3Component implements OnInit {
  shared: SharedService;
  listDistVara: DistribuicaoVara;
  distVara: DistribuicaoVara[];
  dataGrafico = [];
  displayedColumns: string[] = ['Recebidas', 'Digitalizadas', 'Total'] ;
  Tabela = [];
  ano;
  mes;
  mesNome: string;

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
        this.dataGrafico = [this.listDistVara.peticoesRecebidas, this.listDistVara.peticoesDigitalizadas];
        this.Tabela = [{
          recebidos: this.listDistVara.peticoesRecebidas, digitalizados: this.listDistVara.peticoesDigitalizadas,
          total: (this.listDistVara.eletronicoArquivado + this.listDistVara.peticoesDigitalizadas + this.listDistVara.peticoesDigitalizadas)
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
        }
        this.dataGrafico = [this.listDistVara.peticoesRecebidas, this.listDistVara.peticoesDigitalizadas];
        this.Tabela = [{
          recebidos: this.listDistVara.peticoesRecebidas, digitalizados: this.listDistVara.peticoesDigitalizadas,
          total: (this.listDistVara.peticoesRecebidas + this.listDistVara.peticoesDigitalizadas)
        }];
      });
  }
// Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Recebidos', 'Digitalizados'];
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

