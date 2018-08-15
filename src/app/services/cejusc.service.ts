import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cejusc } from 'src/app/models/cejusc.model';
import { ENJ_API } from './enj.api';

@Injectable({
  providedIn: 'root'
})
export class CejuscService {

  constructor(private http: HttpClient ) { }

  createOrUpdate(cejusc: Cejusc) {
    if (cejusc.id != null && cejusc.id !== 0 ) {
      return this.http.put(`${ENJ_API}/cejusc`, cejusc);
    }else{
      cejusc.id = null;
      return this.http.post(`${ENJ_API}/cejusc`, cejusc);
    }
  }

  findById(id: number){
    return this.http.get(`${ENJ_API}/cejusc/${id}`);
  }

  delete(id: number){
    return this.http.delete(`${ENJ_API}/cejusc/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${ENJ_API}/cejusc/${page}/${count}`);
  }

}
