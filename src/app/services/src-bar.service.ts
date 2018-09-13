import { Injectable } from '@angular/core';
import {CejuscGraficoComponent} from '../cejusc/cejusc-grafico/cejusc-grafico.component';
import {ContadoriaJefGraficoComponent} from '../contadoria-jef/contadoria-jef-grafico/contadoria-jef-grafico.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class SrcBarService {
  ano: number;
  mes: number;
  mesNome: string;
  date = new Date();
  mesDisparado = new Subject();
  anoDisparado = new Subject();
  mesNomeDisparo = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  findMesAno(ano1: number, mes1: number) {
    console.log('Mes ' + this.mesNome);
    if (ano1 === undefined) {
      ano1 = this.date.getFullYear();
    }
    this.ano = ano1;
    this.mes = mes1;
    console.log('Ano: ' + this.ano, 'Mes: ' + this.mes);
    // @ts-ignore
    // @ts-ignore
    switch (this.mes) {
      default: {
        this.mesNome = '';
        break;
      }
      case '1': {
        this.mesNome = 'Janeiro';
        break;
      }
      case '2': {
        this.mesNome = 'Fevereiro';
        break;
      }
      case '3': {
        this.mesNome = 'Março';
        break;
      }
      case '4': {
        this.mesNome = 'Abril';
        break;
      }
      case '5': {
        this.mesNome = 'Maio';
        break;
      }
      case '6': {
        this.mesNome = 'Junho';
        break;
      }
      case '7': {
        this.mesNome = 'Julho';
        break;
      }
      case '8': {
        this.mesNome = 'Agosto';
        break;
      }
      case '9': {
        this.mesNome = 'Setembro';
        break;
      }
      case '10': {
        this.mesNome = 'Outubro';
        break;
      }
      case '11': {
        this.mesNome = 'Novembro';
        break;
      }
      case '12': {
        this.mesNome = 'Dezembro';
        break;
      }
    }
    this.anoDisparado.next(ano1);
    this.mesDisparado.next(mes1);
    this.mesNomeDisparo.next(this.mesNome);

  }
}
