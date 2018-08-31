import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContadoriaJef } from '../models/contadoria-jef.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class ContadoriaJefService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(contadoriaJef: ContadoriaJef) {
    if (contadoriaJef.id != null && contadoriaJef.id !== 0 ) {
      return this.http.put(`${ENJ_API}/contadoriajef`, contadoriaJef);
    } else {
      contadoriaJef.id = null;
      return this.http.post(`${ENJ_API}/contadoriajef`, contadoriaJef);
    }
  }

  findById(id: number) {
    return this.http.get(`${ENJ_API}/contadoriajef/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${ENJ_API}/contadoriajef/${id}`);
  }

  findAll(page: number, count: number) {
    return this.http.get(`${ENJ_API}/contadoriajef/${page}/${count}`);
  }

  findByAno(ano: number) {
    return this.http.get(`${ENJ_API}/contadoriajef/pesquisa/${ano}`);
  }

  findByMes(ano: number, mes: number) {
    return this.http.get(`${ENJ_API}/contadoriajef/pesquisa/${ano}/${mes}`);
  }

}
