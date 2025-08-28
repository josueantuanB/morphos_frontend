import { Routes } from '@angular/router';
import { LoginUser } from './layouts/login-user/login-user';
import { LoginRoot } from './layouts/login-root/login-root';
import { Dashboard } from './layouts/dashboard/dashboard';
import { Forms } from './layouts/forms/forms';
import { Users } from './layouts/users/users';
import { Task } from './layouts/task/task';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginUser,
  },
  {
    path: 'login-root',
    component: LoginRoot,
  },
  {
    path: 'dashboard',
     component: Dashboard,
  },
  {
    path: 'forms',
    component: Forms,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'task',
    component: Task,
  },
  {
    path: '**',
    component: Dashboard,
  },
];
