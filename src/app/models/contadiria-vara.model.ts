export class ContadoriaVara {
  constructor(
    public id: number,
    public ano: number,
    public mes: number,
    public fisicoEntrada: number,
    public fisicoSaida: number,
    public fisicoSaldo: number,
    public eletronicoEntrada: number,
    public eletronicoSaida: number,
    public eletronicoSaldo: number,
  ) {}
}
