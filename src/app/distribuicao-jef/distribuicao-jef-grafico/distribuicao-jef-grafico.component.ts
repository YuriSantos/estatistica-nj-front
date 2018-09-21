import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoJef} from '../../models/distribuicao-jef.model';
import {DistribuicaoJefService} from '../../services/distribuicao-jef.service';
import {Router} from '@angular/router';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';
import {ContadoriaVara} from '../../models/contadiria-vara.model';

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
  displayedColumns: string[] = ['13ª Vara', '7ª Vara', 'Turma Recursal', 'Total'];
  displayedColumns2: string[] = ['Advogados', 'TeleJudiciário', 'Atermação', 'Processos'];
  Tabela = [];
  Tabela2 = [];
  ano;
  mes;
  mesNome: string;
  porcentagem1: number;
  porcentagem2: number;
  porcentagem3: number;

  constructor(private router: Router,
              private distJefService: DistribuicaoJefService,
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
    this.distJefService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistJef = responseApi.data;
        this.porcentagem1 = (this.listDistJef.vara13 / (this.listDistJef.vara13 +
        this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.porcentagem2 = (this.listDistJef.vara7 / (this.listDistJef.vara13 +
          this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.porcentagem3 = (this.listDistJef.recursal / (this.listDistJef.vara13 +
          this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.dataGrafico = [this.listDistJef.vara13, this.listDistJef.vara7, this.listDistJef.recursal ];
        this.Tabela = [{
          vara13: this.listDistJef.vara13 + ' (' + this.porcentagem1.toFixed(2) + '%)',
          vara7: this.listDistJef.vara7 + ' (' + this.porcentagem2.toFixed(2) + '%)',
          recursal: this.listDistJef.recursal + ' (' + this.porcentagem3.toFixed(2) + '%)',
          total: (this.listDistJef.vara13 + this.listDistJef.vara7 + this.listDistJef.recursal)
        }];
        this.Tabela2 = [{
          telejudiciario: this.listDistJef.teleJudiciario, atermacao: this.listDistJef.atermacao, advogados: this.listDistJef.advogados,
          processos: this.listDistJef.processos
        }];
      });
  }

  findMesAno(ano: number, mes: number ) {
    this.distJefService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistJef = responseApi.data;
        if (responseApi.data == null) {
          this.listDistJef = new DistribuicaoJef(0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0);
        }
        this.porcentagem1 = (this.listDistJef.vara13 / (this.listDistJef.vara13 +
          this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.porcentagem2 = (this.listDistJef.vara7 / (this.listDistJef.vara13 +
          this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.porcentagem3 = (this.listDistJef.recursal / (this.listDistJef.vara13 +
          this.listDistJef.vara7 + this.listDistJef.recursal)) * 100;
        this.dataGrafico = [this.listDistJef.vara13, this.listDistJef.vara7, this.listDistJef.recursal ];
        this.Tabela = [{
          vara13: this.listDistJef.vara13 + ' (' + this.porcentagem1.toFixed(2) + '%)',
          vara7: this.listDistJef.vara7 + ' (' + this.porcentagem2.toFixed(2) + '%)',
          recursal: this.listDistJef.recursal + ' (' + this.porcentagem3.toFixed(2) + '%)',
          total: (this.listDistJef.vara13 + this.listDistJef.vara7 + this.listDistJef.recursal)
        }];
        this.Tabela2 = [{
          telejudiciario: this.listDistJef.teleJudiciario, atermacao: this.listDistJef.atermacao, advogados: this.listDistJef.advogados,
          processos: this.listDistJef.processos
        }];
      });
  }
  // Pie
  // tslint:disable-next-line:member-ordering
  public pieChartLabels: string[] = ['13ª Vara', '7ª Vara', 'Turma Recursal'];
  // tslint:disable-next-line:member-ordering
  public pieChartData: number[] = [300, 500];
  // tslint:disable-next-line:member-ordering
  public pieChartType = 'pie';
  // tslint:disable-next-line:member-ordering
  public coresGrafico: Array<any> = [
    { // first color
      backgroundColor: ['#00a7e1', '#003459' , '#FAC05E']
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

