import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENJ_API } from './enj.api';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    return this.http.post(`${ENJ_API}/api/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario) {
    if (usuario.id != null && usuario.id !== '') {
      return this.http.put(`${ENJ_API}/usuario`, usuario);
    } else {
      usuario.id = null;
      return this.http.post(`${ENJ_API}/usuario`, usuario);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${ENJ_API}/usuario/${page}/${count}`);
  }

  findById(id: number) {
    return this.http.get(`${ENJ_API}/usuario/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${ENJ_API}/usuario/${id}`);
  }
}
