import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {DistribuicaoJef} from '../../models/distribuicao-jef.model';
import {Router} from '@angular/router';
import {DistribuicaoJefService} from '../../services/distribuicao-jef.service';
import {ResponseApi} from '../../models/response-api';

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

  constructor(private router: Router,
              private distJefService: DistribuicaoJefService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
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
}
