import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  shared: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: any;

    if (this.shared.isLoggedIn()) {
        authRequest = req.clone({
          setHeaders: {
            'Authorization': this.shared.token
          }
        });
        return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}
