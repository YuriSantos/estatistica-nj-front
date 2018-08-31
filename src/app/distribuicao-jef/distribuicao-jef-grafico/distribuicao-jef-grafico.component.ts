import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoJef} from '../../models/distribuicao-jef.model';
import {MatTableDataSource} from '@angular/material';
import {DistribuicaoJefService} from '../../services/distribuicao-jef.service';
import {Router} from '@angular/router';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-distribuicao-jef-grafico',
  templateUrl: './distribuicao-jef-grafico.component.html',
  styleUrls: ['./distribuicao-jef-grafico.component.scss']
})
export class DistribuicaoJefGraficoComponent implements OnInit {
  shared: SharedService;
  listDistJef: DistribuicaoJef;
  distJef: DistribuicaoJef[];
  dataGrafico = [];
  displayedColumns: string[] = ['13ª Vara', '7ª Vara', 'Turma Recursal'];
  dataSource = new MatTableDataSource<DistribuicaoJef>();

  constructor(private router: Router,
              private distJefService: DistribuicaoJefService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  findAno(ano: number) {
    this.distJefService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistJef = responseApi.data;
        this.distJef = responseApi['data'];
        this.dataGrafico = [this.listDistJef.vara13, this.listDistJef.vara7, this.listDistJef.recursal ]
      });
  }
  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['13ª Vara', '7ª Vara', 'Turma Recursal'];
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

