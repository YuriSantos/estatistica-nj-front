import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CejuscService} from '../../services/cejusc.service';
import {SharedService} from '../../services/shared.service';
import {ResponseApi} from '../../models/response-api';
import {Cejusc} from '../../models/cejusc.model';
import {SrcBarService} from '../../services/src-bar.service';

export interface ElementoTabela {
  acordo: number;
  semAcordo: number;
  total: number;
}

@Component({
  selector: 'app-cejusc-grafico',
  templateUrl: './cejusc-grafico.component.html',
  styleUrls: ['./cejusc-grafico.component.scss']
})
export class CejuscGraficoComponent implements OnInit {
  shared: SharedService;
  listCejusc: Cejusc;
  cejusc: Cejusc[];
  Tabela = [];
  dataGrafico = [];
  displayedColumns: string[] = ['Acordo', 'Sem Acordo', 'Total'];

  constructor(private router: Router,
              private cejuscService: CejuscService,
              private srcBarService: SrcBarService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    const date = new Date();
    this.findAno(date.getFullYear());
    console.log(this.srcBarService.returning());
  }

  findAno(ano: number) {
    this.cejuscService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listCejusc = responseApi.data;
        this.cejusc = responseApi['data'][''];
        this.dataGrafico = [this.listCejusc.acordo, this.listCejusc.semAcordo];
        this.Tabela = [{
          acordo: this.listCejusc.acordo, semAcordo: this.listCejusc.semAcordo, total: (this.listCejusc.acordo + this.listCejusc.semAcordo)
        }];

      });
  }

  // Pie
  public pieChartLabels: string[] = ['Acordo', 'Sem Acordo'];
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

