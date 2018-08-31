import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ContadoriaJef} from '../../models/contadoria-jef.model';
import {MatTableDataSource} from '@angular/material';
import {Cejusc} from '../../models/cejusc.model';
import {Router} from '@angular/router';
import {ContadoriaJefService} from '../../services/contadoria-jef.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-contadoria-jef-grafico',
  templateUrl: './contadoria-jef-grafico.component.html',
  styleUrls: ['./contadoria-jef-grafico.component.scss']
})
export class ContadoriaJefGraficoComponent implements OnInit {
  shared: SharedService;
  listContJef: ContadoriaJef;
  contJef: ContadoriaJef[];
  dataGrafico = [];
  displayedColumns: string[] = ['Calculos', 'Atualizações'];
  dataSource = new MatTableDataSource<ContadoriaJef>();

  constructor(private router: Router,
              private contadoriaJefService: ContadoriaJefService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  findAno(ano: number) {
    this.contadoriaJefService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listContJef = responseApi.data;
        this.contJef = responseApi['data'];
        this.dataGrafico = [this.listContJef.calculos, this.listContJef.atualizacoes];
        this.dataSource.data = this.contJef;

      });
  }

  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Calculos', 'Atualizações'];
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
