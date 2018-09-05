import { Injectable } from '@angular/core';
import {CejuscGraficoComponent} from '../cejusc/cejusc-grafico/cejusc-grafico.component';

@Injectable({
  providedIn: 'root'
})
export class SrcBarService {

  constructor(private cejuscGr: CejuscGraficoComponent) { }

  findMesAno(ano: number, mes: number) {
    this.cejuscGr.findAno(ano);
  }
}
