import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from './services/cache.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const key = this.cache.by('kv','key','access_token')?.value ?? '';
    if (key){
      return next.handle(request.clone({headers: request.headers.set('Authorization','Bearer ' + key)}));
    }
    return next.handle(request);
  }
}
