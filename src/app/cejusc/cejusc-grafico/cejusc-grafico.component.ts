import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CejuscService} from '../../services/cejusc.service';
import {SharedService} from '../../services/shared.service';
import {ResponseApi} from '../../models/response-api';
import {Cejusc} from '../../models/cejusc.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-cejusc-grafico',
  templateUrl: './cejusc-grafico.component.html',
  styleUrls: ['./cejusc-grafico.component.scss']
})
export class CejuscGraficoComponent implements OnInit {
  shared: SharedService;
  listCejusc: Cejusc;
  cejusc: Cejusc[];
  dataGrafico = [];
  displayedColumns: string[] = ['Acordo', 'Sem Acordo'];
  dataSource = new MatTableDataSource<Cejusc>();

  constructor(private router: Router,
              private cejuscService: CejuscService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
  }

  findAno(ano: number) {
    this.cejuscService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listCejusc = responseApi.data;
        this.cejusc = responseApi['data'];
        this.dataGrafico = [this.listCejusc.acordo, this.listCejusc.semAcordo];
        this.dataSource.data = this.cejusc;

      });
  }

  // Pie
  public pieChartLabels: string[] = ['Acordo', 'Sem Acordo'];
  public pieChartData: number[] = [300, 500];
  public pieChartType = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

