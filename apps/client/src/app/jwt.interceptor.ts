import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const key = sessionStorage.getItem('access_token');
    if (key){
      return next.handle(request.clone({headers: request.headers.set('Authorization','Bearer ' + key)}));
    }
    return next.handle(request);
  }
}
