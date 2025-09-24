import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
];
