import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CejuscService} from '../../services/cejusc.service';
import {SharedService} from '../../services/shared.service';
import {ResponseApi} from '../../models/response-api';
import {Cejusc} from '../../models/cejusc.model';
import {SrcBarService} from '../../services/src-bar.service';

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
  ano;
  mes;
  mesNome: string;
  legend = true;
  porcentagem1: number;
  porcentagem2: number;
  porc1: string;
  porc2: string;

  constructor(private router: Router,
              private cejuscService: CejuscService,
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


    // console.log(this.srcBarService.returning());
  }

  findAno(ano: number) {
    this.cejuscService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listCejusc = responseApi.data;
        this.porcentagem1 = (this.listCejusc.acordo / (this.listCejusc.acordo + this.listCejusc.semAcordo)) * 100;
        this.porcentagem2 = (this.listCejusc.semAcordo / (this.listCejusc.acordo + this.listCejusc.semAcordo)) * 100;
        this.dataGrafico = [this.listCejusc.acordo, this.listCejusc.semAcordo];
        this.Tabela = [{
          acordo: this.listCejusc.acordo + ' (' + this.porcentagem1.toFixed(2) + '%)',
          semAcordo: this.listCejusc.semAcordo + ' (' + this.porcentagem2.toFixed(2) + '%)',
          total: (this.listCejusc.acordo + this.listCejusc.semAcordo)
        }];

      });
  }

  findMesAno(ano: number, mes: number) {
    this.cejuscService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listCejusc = responseApi.data;
        if (responseApi.data == null) {
          this.listCejusc = new Cejusc(0, 0, 0, 0, 0);
          this.porcentagem1 = 0;
          this.porcentagem2 = 0;
        }
        this.porcentagem1 = (this.listCejusc.acordo / (this.listCejusc.acordo + this.listCejusc.semAcordo)) * 100;
        this.porcentagem2 = (this.listCejusc.semAcordo / (this.listCejusc.acordo + this.listCejusc.semAcordo)) * 100;
        this.dataGrafico = [this.listCejusc.acordo, this.listCejusc.semAcordo];
        this.Tabela = [{
          acordo: this.listCejusc.acordo + ' (' + this.porcentagem1.toFixed(2) + '%)',
          semAcordo: this.listCejusc.semAcordo + ' (' + this.porcentagem2.toFixed(2) + '%)',
          total: (this.listCejusc.acordo + this.listCejusc.semAcordo)
        }];

      });
  }

  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Acordo ' + this.porc1 + '%', 'Sem Acordo ' + this.porc2 + '%'];
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

