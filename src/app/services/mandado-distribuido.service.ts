import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MandadoDistribuido } from '../models/mandado-distribuido.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class MandadoDistribuidoService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(mandadosDistribuidos: MandadoDistribuido) {
    if (mandadosDistribuidos.id != null && mandadosDistribuidos.id !== 0 ) {
      return this.http.put(`${ENJ_API}/mandado`, mandadosDistribuidos);
    }else{
      mandadosDistribuidos.id = null;
      return this.http.post(`${ENJ_API}/mandado`, mandadosDistribuidos);
    }
  }

  findById(id: number){
    return this.http.get(`${ENJ_API}/mandado/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${ENJ_API}/mandado/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${ENJ_API}/mandado/${page}/${count}`);
  }

}
