import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {Arquivo} from '../../models/arquivo.model';
import {Router} from '@angular/router';
import {ArquivoService} from '../../services/arquivo.service';
import {ResponseApi} from '../../models/response-api';

@Component({
  selector: 'app-arquivo-tabela',
  templateUrl: './arquivo-tabela.component.html',
  styleUrls: ['./arquivo-tabela.component.scss']
})
export class ArquivoTabelaComponent implements OnInit {
  shared: SharedService;
  listArquivo: Arquivo;
  arquivo: Arquivo[];
  Tabela = [];
  dataGrafico = [];
  displayedColumns: string[] = ['Desarquivado e enviado para a vara',
    'Caixa devolvida retorno vara',
    'Feitura Caixa para guarda processo arquivo',
    'Distribuição Arquivamento',
    'Caixa a cotes',
    'Baixado Guardados Caixa a cote',
    'Processos Recebidos Vara Baixa'];

  constructor(private router: Router,
              private arquivoService: ArquivoService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAno(2018);
  }

  findAno(ano: number) {
    this.arquivoService.findByAno(ano)
      .subscribe((responseApi: ResponseApi) => {
        this.listArquivo = responseApi.data;
        this.Tabela = [{
          desarquivadoEnviadoVara: this.listArquivo.desarquivadoEnviadoVara,
          devolvidoCaixaRetornoVara: this.listArquivo.devolvidoCaixaRetornoVara,
          feituraCaixaParaGuardaProcessoArquivo: this.listArquivo.feituraCaixaParaGuardaProcessoArquivo,
          distribuicaoArquivamento: this.listArquivo.distribuicaoArquivamento,
          caixaAcotes: this.listArquivo.caixaAcotes,
          baixadoGuardadosCaixaAcote: this.listArquivo.baixadoGuardadosCaixaAcote,
          processosRecebidosVaraBaixa: this.listArquivo.processosRecebidosVaraBaixa
        }];
      });
  }

}
