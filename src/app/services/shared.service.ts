import { Injectable,EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public static instance: SharedService = null;
  usuario: Usuario;
  token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean {
    if (this.usuario == null) {
      return false;
    }
    return this.usuario.email !== '';
  }
}
