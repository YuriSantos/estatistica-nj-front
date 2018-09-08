import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  public shared: SharedService;

  constructor(private router: Router) {
    this.shared = SharedService.getInstance();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.shared.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }

}
