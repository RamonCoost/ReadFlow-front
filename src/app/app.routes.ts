import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { BooksComponent } from './features/books/books.component';
import { CreateBookComponent } from './features/create-book/create-book.component';
import { HomeComponent } from './features/home/pages/home/home.component';



export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
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
