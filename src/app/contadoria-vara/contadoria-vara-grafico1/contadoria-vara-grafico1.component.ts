import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ContadoriaVara} from '../../models/contadiria-vara.model';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ContadoriaVaraService} from '../../services/contadoria-vara.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-contadoria-vara-grafico1',
  templateUrl: './contadoria-vara-grafico1.component.html',
  styleUrls: ['./contadoria-vara-grafico1.component.scss']
})
export class ContadoriaVaraGrafico1Component implements OnInit {
  shared: SharedService;
  listContVara: ContadoriaVara;
  contVara: ContadoriaVara[];
  dataGrafico = [];
  displayedColumns: string[] = ['Físico Entrada', 'Eletrônico Entrada', 'Total'];
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
        this.dataGrafico = [this.listContVara.fisicoEntrada, this.listContVara.eletronicoEntrada];
        this.Tabela = [{
          fisicoEntrada: this.listContVara.fisicoEntrada, eletronicoEntrada: this.listContVara.eletronicoEntrada,
          total: (this.listContVara.fisicoEntrada + this.listContVara.eletronicoEntrada)
        }];

      });
  }

  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Físico Entrada', 'Eletrônico Entrada'];
  // tslint:disable-next-line:member-ordering
  public pieChartData: number[] = [300, 500];
  public pieChartType = 'pie';
  public coresGrafico: Array<any> = [
    { // first color
      backgroundColor: ['#00a7e1', '#003459']
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

