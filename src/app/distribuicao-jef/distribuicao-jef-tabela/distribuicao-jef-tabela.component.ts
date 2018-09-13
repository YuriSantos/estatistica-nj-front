import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoJef} from '../../models/distribuicao-jef.model';
import {Router} from '@angular/router';
import {DistribuicaoJefService} from '../../services/distribuicao-jef.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

@Component({
  selector: 'app-distribuicao-jef-tabela',
  templateUrl: './distribuicao-jef-tabela.component.html',
  styleUrls: ['./distribuicao-jef-tabela.component.scss']
})
export class DistribuicaoJefTabelaComponent implements OnInit {
  shared: SharedService;
  listDistJef: DistribuicaoJef;
  distJef: DistribuicaoJef[];
  dataGrafico = [];
  displayedColumns: string[] = ['Advogados', 'TeleJudiciário', 'Atermação', 'Processos'];
  Tabela = [];
  ano;
  mes;
  mesNome: string;

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
        this.Tabela = [{
          telejudiciario: this.listDistJef.teleJudiciario, atermacao: this.listDistJef.atermacao, advogados: this.listDistJef.advogados,
          processos: this.listDistJef.processos
        }];
      });
  }

  findMesAno(ano: number, mes: number) {
    this.distJefService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listDistJef = responseApi.data;
        if (responseApi.data == null) {
          this.listDistJef = new DistribuicaoJef(0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0);
        }
        this.Tabela = [{
          telejudiciario: this.listDistJef.teleJudiciario, atermacao: this.listDistJef.atermacao, advogados: this.listDistJef.advogados,
          processos: this.listDistJef.processos
        }];
      });
  }
}
