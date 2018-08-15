export class Arquivo {
  constructor(
    public id: number,
    public ano: number,
    public mes: number,
    public desarquivadoEnviadoVara: number,
    public devolvidoCaixaRetornoVara: number,
    public feituraCaixaParaGuardaProcessoArquivo: number,
    public distribuicaoArquivamento: number,
    public caixaAcotes: number,
    public baixadoGuardadosCaixaAcote: number,
    public processosRecebidosVaraBaixa: number,
  ) {}
}
