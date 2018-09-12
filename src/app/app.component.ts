import { Component } from '@angular/core';
import {SharedService} from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enj';

  shared: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  signOut(): void {
    this.shared.token = null;
    this.shared.usuario = null;
    window.location.href = '/login';
    window.location.reload();
  }
}
