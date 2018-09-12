import { Injectable } from '@angular/core';
import {CejuscGraficoComponent} from '../cejusc/cejusc-grafico/cejusc-grafico.component';
import {ContadoriaJefGraficoComponent} from '../contadoria-jef/contadoria-jef-grafico/contadoria-jef-grafico.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SrcBarService {
  ano: number;
  mes: number;
  date = new Date();
  mesDisparado = new Subject();
  anoDisparado = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  findMesAno(ano1: number, mes1: number) {
    if (ano1 === undefined) {
      ano1 = this.date.getFullYear();
    }
    this.ano = ano1;
    this.mes = mes1;
    console.log('Ano: ' + this.ano, 'Mes: ' + this.mes);
    this.anoDisparado.next(ano1);
    this.mesDisparado.next(mes1);
  }
}
