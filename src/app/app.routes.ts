import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { BooksComponent } from './features/books/books.component';
import { CreateBookComponent } from './features/create-book/create-book.component';



export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
              {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'books',
                component: BooksComponent,
            },
            {
                path: 'create-book',
                component: CreateBookComponent
            },
        ]
    }
];
