import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlTs } from './core/config/paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [{provide: MatPaginatorIntl, useFactory: PaginatorIntlTs}, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(
    withInterceptors([
      authInterceptor
    ])
  )]
};
