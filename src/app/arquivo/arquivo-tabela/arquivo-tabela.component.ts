import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {Arquivo} from '../../models/arquivo.model';
import {Router} from '@angular/router';
import {ArquivoService} from '../../services/arquivo.service';
import {ResponseApi} from '../../models/response-api';
import {SrcBarService} from '../../services/src-bar.service';

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
  mesNome: string;
  displayedColumns: string[] = ['Desarquivado e enviado para a vara',
    'Caixa devolvida retorno vara',
    'Feitura Caixa para guarda processo arquivo',
    'Distribuição Arquivamento',
    'Caixa a cotes',
    'Baixado Guardados Caixa a cote',
    'Processos Recebidos Vara Baixa'];
  ano;
  mes;

  constructor(private router: Router,
              private arquivoService: ArquivoService,
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

  findMesAno(ano: number, mes: number) {
    this.arquivoService.findByMes(ano, mes)
      .subscribe((responseApi: ResponseApi) => {
        this.listArquivo = responseApi.data;
        if (responseApi.data == null) {
          this.listArquivo = new Arquivo(0, 0, 0, 0, 0, 0, 0,
            0, 0, 0);
        }
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
