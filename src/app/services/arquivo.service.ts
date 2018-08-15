import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Arquivo } from 'src/app/models/arquivo.model';
import { ENJ_API } from 'src/app/services/enj.api';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(arquivo: Arquivo) {
    if (arquivo.id != null && arquivo.id !== 0 ) {
      return this.http.put(`${ENJ_API}/arquivo`, arquivo);
    }else{
      arquivo.id = null;
      return this.http.post(`${ENJ_API}/arquivo`, arquivo);
    }
  }

  findById(id: number){
    return this.http.get(`${ENJ_API}/arquivo/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${ENJ_API}/arquivo/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${ENJ_API}/arquivo/${page}/${count}`);
  }

}
