import { Injectable } from '@angular/core';
import {CejuscGraficoComponent} from '../cejusc/cejusc-grafico/cejusc-grafico.component';
import {ContadoriaJefGraficoComponent} from '../contadoria-jef/contadoria-jef-grafico/contadoria-jef-grafico.component';

@Injectable({
  providedIn: 'root'
})
export class SrcBarService {
  ano: number;
  mes: number;

  constructor() { }

  findMesAno(ano1: number, mes1: number) {
    this.ano = ano1;
    this.mes = mes1;
    console.log('Ano: ' + this.ano, 'Mes: ' + this.mes);
  }

  returning() {
    return this.ano;
  }
}
