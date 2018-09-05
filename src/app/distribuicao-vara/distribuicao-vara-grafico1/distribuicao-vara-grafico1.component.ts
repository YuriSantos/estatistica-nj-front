import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoVara} from '../../models/distribuicao-vara.model';
import {Router} from '@angular/router';
import {DistribuicaoVaraService} from '../../services/distribuicao-vara.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-distribuicao-vara-grafico1',
  templateUrl: './distribuicao-vara-grafico1.component.html',
  styleUrls: ['./distribuicao-vara-grafico1.component.scss']
})
export class DistribuicaoVaraGrafico1Component implements OnInit {
  shared: SharedService;
  listDistVara: DistribuicaoVara;
  distVara: DistribuicaoVara[];
  dataGrafico = [];
  Tabela = [];
  displayedColumns: string[] = ['Distribuidos', 'Arquivados', 'Total'] ;

  constructor(private router: Router,
              private distribuicaoVaraService: DistribuicaoVaraService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
  }

  findAno(ano: number) {
    this.distribuicaoVaraService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistVara = responseApi.data;
        this.distVara = responseApi['data'];
        this.dataGrafico = [this.listDistVara.fisicoArquivado, this.listDistVara.fisicoDistribuido];
        this.Tabela = [{
          fisicoArquivado: this.listDistVara.fisicoArquivado, fisicoDistribuido: this.listDistVara.fisicoDistribuido,
          total: (this.listDistVara.fisicoArquivado + this.listDistVara.fisicoDistribuido)
        }];
      });
  }
// Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Distribuidos', 'Arquivados'];
  // tslint:disable-next-line:member-ordering
  public pieChartData: number[] = [300, 500];
  public pieChartType = 'pie';
  public coresGrafico: Array<any> = [
    { // first color
      backgroundColor: ['#00a7e1', '#003459', '#FAC05E']
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

