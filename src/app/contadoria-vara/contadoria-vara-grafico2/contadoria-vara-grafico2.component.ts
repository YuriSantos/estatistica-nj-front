import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ContadoriaVara} from '../../models/contadiria-vara.model';
import {Router} from '@angular/router';
import {ContadoriaVaraService} from '../../services/contadoria-vara.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

@Component({
  selector: 'app-contadoria-vara-grafico2',
  templateUrl: './contadoria-vara-grafico2.component.html',
  styleUrls: ['./contadoria-vara-grafico2.component.scss']
})
export class ContadoriaVaraGrafico2Component implements OnInit {
  shared: SharedService;
  listContVara: ContadoriaVara;
  contVara: ContadoriaVara[];
  dataGrafico = [];
  displayedColumns: string[] = ['Físico Saída', 'Eletrônico Saída', 'Total'];
  Tabela = [];
  ano;
  mes;
  mesNome: string;

  constructor(private router: Router,
              private contVaraService: ContadoriaVaraService,
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
    this.contVaraService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listContVara = responseApi.data;
        this.dataGrafico = [this.listContVara.fisicoSaida, this.listContVara.eletronicoSaida];
        this.Tabela = [{
          fisicoSaida: this.listContVara.fisicoSaida, eletronicoSaida: this.listContVara.eletronicoSaida,
          total: (this.listContVara.fisicoSaida + this.listContVara.eletronicoSaida)
        }];

      });
  }

  findMesAno(ano: number, mes: number ) {
    this.contVaraService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listContVara = responseApi.data;
        if (responseApi.data == null) {
          this.listContVara = new ContadoriaVara(0, 0, 0,
            0, 0, 0, 0,
            0, 0);
        }
        this.dataGrafico = [this.listContVara.fisicoSaida, this.listContVara.eletronicoSaida];
        this.Tabela = [{
          fisicoSaida: this.listContVara.fisicoSaida, eletronicoSaida: this.listContVara.eletronicoSaida,
          total: (this.listContVara.fisicoSaida + this.listContVara.eletronicoSaida)
        }];

      });
  }

  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Físico Saída', 'Eletrônico Saída'];
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

