import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MandadoDistribuido} from '../../models/mandado-distribuido.model';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {MandadoDistribuidoService} from '../../services/mandado-distribuido.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-mandado-distribuido-grafico',
  templateUrl: './mandado-distribuido-grafico.component.html',
  styleUrls: ['./mandado-distribuido-grafico.component.scss']
})
export class MandadoDistribuidoGraficoComponent implements OnInit {
  shared: SharedService;
  listMandado: MandadoDistribuido;
  mandado: MandadoDistribuido[];
  dataGrafico = [];
  displayedColumns: string[] = ['Físico', 'PJE', 'Total'];
  Tabela = [];

  constructor(private router: Router,
              private mandadoService: MandadoDistribuidoService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
  }

  findAno(ano: number) {
    this.mandadoService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listMandado = responseApi.data;
        this.mandado = responseApi['data'];
        this.dataGrafico = [(this.listMandado.vara1 +
          this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
          this.listMandado.vara16), this.listMandado.pje];
          this.Tabela = [{
            mandadosFisicos: (this.listMandado.vara1 +
              this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
              this.listMandado.vara16), PJE: this.listMandado.pje, total: (this.listMandado.vara1 +
              this.listMandado.vara2 + this.listMandado.vara3 + this.listMandado.vara5 +
              this.listMandado.vara16 + this.listMandado.pje)
          }];
      });
  }
// Pie
  public pieChartLabels: string[] = ['Físico', 'PJE'];
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

