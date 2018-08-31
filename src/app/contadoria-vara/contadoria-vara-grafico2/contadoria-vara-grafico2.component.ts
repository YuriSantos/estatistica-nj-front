import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ContadoriaVara} from '../../models/contadiria-vara.model';
import {Router} from '@angular/router';
import {ContadoriaVaraService} from '../../services/contadoria-vara.service';
import {ResponseApi} from '../../models/response-api';

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

  constructor(private router: Router,
              private contVaraService: ContadoriaVaraService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
  }

  findAno(ano: number) {
    this.contVaraService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listContVara = responseApi.data;
        this.contVara = responseApi['data'];
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
  public pieChartType = 'pie';
  public coresGrafico: Array<any> = [
    { // first color
      backgroundColor: ['#00a7e1', '#003459']
    }
  ]

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

