import { Injectable } from '@angular/core';
import {CejuscGraficoComponent} from '../cejusc/cejusc-grafico/cejusc-grafico.component';
import {ContadoriaJefGraficoComponent} from '../contadoria-jef/contadoria-jef-grafico/contadoria-jef-grafico.component';

@Injectable({
  providedIn: 'root'
})
export class SrcBarService {
  ano: number;
  mes: number;
  date = new Date();

  constructor() { }

  findMesAno(ano1: number, mes1: number) {
    if (ano1 === undefined) {
      ano1 = this.date.getFullYear();
    }
    this.ano = ano1;
    this.mes = mes1;
    console.log('Ano: ' + this.ano, 'Mes: ' + this.mes);
    location.reload();
  }

  returning() {
    return this.ano;
  }
}
