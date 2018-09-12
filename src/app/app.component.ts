import { Component } from '@angular/core';
import {SharedService} from './services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enj';

  shared: SharedService;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.shared = SharedService.getInstance();
  }

  signOut(): void {
    this.shared.token = null;
    this.shared.usuario = null;
    this.router.navigate(['/']);
  }
}
