export class DistribuicaoVara {
  constructor(
    public id: number,
    public ano: number,
    public mes: number,
    public fisicoDistribuido: number,
    public fisicoArquivado: number,
    public eletronicoDistribuido: number,
    public eletronicoArquivado: number,
    public processosMigrados: number,
    public peticoesRecebidas: number,
    public peticoesDigitalizadas: number
  ) {}
}
