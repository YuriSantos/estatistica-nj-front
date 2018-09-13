import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ContadoriaJef} from '../../models/contadoria-jef.model';
import {Router} from '@angular/router';
import {ContadoriaJefService} from '../../services/contadoria-jef.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

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
  displayedColumns: string[] = ['Calculos', 'Atualizações', 'Total'];
  Tabela = [];
  ano;
  mes;
  mesNome: string;

  constructor(private router: Router,
              private contadoriaJefService: ContadoriaJefService,
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
  }

  findAno(ano: number) {
    this.contadoriaJefService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listContJef = responseApi.data;
        this.contJef = responseApi['data'];
        this.dataGrafico = [this.listContJef.calculos, this.listContJef.atualizacoes];
        this.Tabela = [{
          calculos: this.listContJef.calculos, atualizacoes: this.listContJef.atualizacoes,
          total: (this.listContJef.calculos + this.listContJef.atualizacoes)
        }];

      });
  }

  findMesAno(ano: number, mes: number) {
    this.contadoriaJefService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listContJef = responseApi.data;
        if (responseApi.data == null) {
          this.listContJef = new ContadoriaJef(0, 0, 0, 0, 0);
        }
        this.dataGrafico = [this.listContJef.calculos, this.listContJef.atualizacoes];
        this.Tabela = [{
          calculos: this.listContJef.calculos, atualizacoes: this.listContJef.atualizacoes,
          total: (this.listContJef.calculos + this.listContJef.atualizacoes)
        }];

      });
  }

  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['Calculos', 'Atualizações'];
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
