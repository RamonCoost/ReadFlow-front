import { Routes } from '@angular/router';
import { BooksComponent } from './features/books/books.component';
import { CreateBookComponent } from './features/create-book/create-book.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/pages/home.component';
import { RegisterComponent } from './features/register/pages/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './features/login/pages/login.component';



export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'register', component: RegisterComponent 
    },
    {
        path: 'login', component: LoginComponent
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
