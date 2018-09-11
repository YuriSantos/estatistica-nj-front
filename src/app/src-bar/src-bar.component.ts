import { Component, OnInit } from '@angular/core';
import {SrcBarService} from '../services/src-bar.service';


@Component({
  selector: 'app-src-bar',
  templateUrl: './src-bar.component.html',
  styleUrls: ['./src-bar.component.scss']
})
export class SrcBarComponent implements OnInit {
  ano: number;
  mes: number;

  constructor(private srcService: SrcBarService) { }

  ngOnInit() {

  }

  findAnoMes(): void {
    this.srcService.findMesAno(this.ano, this.mes);
  }

}
