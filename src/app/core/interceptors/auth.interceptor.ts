import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.obterToken();

  if (token) {
    let requisicao = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
    return next(requisicao)
      .pipe(catchError((error) => {
        if (error.status === 401) {
          auth.removerToken();
          router.navigate(['/login'])
        }
        return throwError(() => error)
      }))

  }

  return next(req);
}
