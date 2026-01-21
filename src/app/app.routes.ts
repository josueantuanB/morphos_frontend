import { Routes } from '@angular/router';
import { LoginUser } from './layouts/login-user/login-user';
import { LoginRoot } from './layouts/login-root/login-root';
import { Dashboard } from './layouts/dashboard/dashboard';
import { Forms } from './layouts/forms/forms';
import { Users } from './layouts/users/users';
import { Roles } from './layouts/roles/roles';
import { CreateForm } from './layouts/create-form/create-form';
import { Task } from './layouts/task/task';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginUser,
    canActivate: [loginGuard]
  },
  {
    path: 'login-root',
    component: LoginRoot,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'forms',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Forms
      },
      {
        path: 'create',
        component: CreateForm
      }
    ]
  },
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      {
        path: 'management',
        component: Users
      },
      {
        path: 'roles',
        component: Roles
      },
      {
        path: '',
        redirectTo: 'management',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'task',
    component: Task,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  },
];
