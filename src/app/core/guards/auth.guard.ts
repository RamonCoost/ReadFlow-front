import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const token = auth.obterToken();
  const router = inject(Router);

  if (token) {
    return true;
  }
  return router.createUrlTree(['/login'])
};
