import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const token = auth.obterToken();

  if (token) {
    let requisicao = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
    return next(requisicao);
  }
  return next(req);
};
