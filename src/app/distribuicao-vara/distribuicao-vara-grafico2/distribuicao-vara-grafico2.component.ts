import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoVara} from '../../models/distribuicao-vara.model';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {DistribuicaoVaraService} from '../../services/distribuicao-vara.service';
import {ResponseApi} from '../../models/response-api';

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
  displayedColumns: string[] = ['Distribuidos', 'Arquivados'] ;
  dataSource = new MatTableDataSource<DistribuicaoVara>();

  constructor(private router: Router,
              private distribuicaoVaraService: DistribuicaoVaraService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  findAno(ano: number) {
    this.distribuicaoVaraService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistVara = responseApi.data;
        this.distVara = responseApi['data'];
        this.dataGrafico = [this.listDistVara.eletronicoArquivado, this.listDistVara.eletronicoDistribuido];
        this.dataSource.data = this.distVara;
      });
  }
// Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Acordo', 'Sem Acordo'];
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

