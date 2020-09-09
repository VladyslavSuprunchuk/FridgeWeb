import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage['token'] != null) {
        req = req.clone({
        headers: req.headers.append('Authorization', localStorage['token'])
      });
    }

    return next.handle(req);
  }
}
