import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: About,
    title: 'About Page',
  },
  {
    path: 'contact',
    component: Contact,
    title: 'Contact Page',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.routes').then((r) => r.routes),
  },
  {
    path: 'carts',
    loadChildren: () =>
      import('./pages/carts/carts.routes').then((r) => r.routes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.routes').then((r) => r.routes),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((c) => c.NotFound),
    title: 'Page Not Found',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
