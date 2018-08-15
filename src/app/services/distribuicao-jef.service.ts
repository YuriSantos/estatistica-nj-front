import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DistribuicaoJef } from '../models/distribuicao-jef.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoJefService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(distribuicaoJef: DistribuicaoJef) {
    if (distribuicaoJef.id != null && distribuicaoJef.id !== 0 ) {
      return this.http.put(`${ENJ_API}/distribuicaojef`, distribuicaoJef);
    }else{
      distribuicaoJef.id = null;
      return this.http.post(`${ENJ_API}/distribuicaojef`, distribuicaoJef);
    }
  }

  findById(id: number){
    return this.http.get(`${ENJ_API}/distribuicaojef/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${ENJ_API}/distribuicaojef/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${ENJ_API}/distribuicaojef/${page}/${count}`);
  }

  }
