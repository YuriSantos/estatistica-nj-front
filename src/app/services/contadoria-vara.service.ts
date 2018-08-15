import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContadoriaVara } from '../models/contadiria-vara.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class ContadoriaVaraService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(contadoriaVara: ContadoriaVara) {
    if (contadoriaVara.id != null && contadoriaVara.id !== 0 ) {
      return this.http.put(`${ENJ_API}/contadoriavara`, contadoriaVara);
    }else{
      contadoriaVara.id = null;
      return this.http.post(`${ENJ_API}/contadoriavara`, contadoriaVara);
    }
  }

  findById(id: number){
    return this.http.get(`${ENJ_API}/contadoriavara/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${ENJ_API}/contadoriavara/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${ENJ_API}/contadoriavara/${page}/${count}`);
  }

  }
