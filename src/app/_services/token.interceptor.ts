import {Injectable} from '@angular/core';
import { HttpInterceptor,  HttpHandler, HttpRequest,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = localStorage.getItem('token');
        req = this.addToken(req , token);
        return next.handle(req);
    }
    private  addToken(request: HttpRequest<any>,token:string)
    {
        return request.clone({
            setHeaders:{'Authorization':'Bearer '+token}
        })
    }
}
export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  };