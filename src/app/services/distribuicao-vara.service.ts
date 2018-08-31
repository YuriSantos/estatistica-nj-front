import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DistribuicaoVara } from '../models/distribuicao-vara.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoVaraService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(distribuicaoVara: DistribuicaoVara) {
    if (distribuicaoVara.id != null && distribuicaoVara.id !== 0 ) {
      return this.http.put(`${ENJ_API}/distribuicaovara`, distribuicaoVara);
    } else {
      distribuicaoVara.id = null;
      return this.http.post(`${ENJ_API}/distribuicaovara`, distribuicaoVara);
    }
  }

  findById(id: number) {
    return this.http.get(`${ENJ_API}/distribuicaovara/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${ENJ_API}/distribuicaovara/${id}`);
  }

  findAll(page: number, count: number) {
    return this.http.get(`${ENJ_API}/distribuicaovara/${page}/${count}`);
  }

  findByAno(ano: number) {
    return this.http.get(`${ENJ_API}/distribuicaovara/pesquisa/${ano}`);
  }

  findByMes(ano: number, mes: number) {
    return this.http.get(`${ENJ_API}/distribuicaovara/pesquisa/${ano}/${mes}`);
  }

}
