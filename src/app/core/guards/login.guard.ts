import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si ya está autenticado, redirigir al dashboard
    router.navigate(['/dashboard']);
    return false;
  } else {
    // Si no está autenticado, permitir acceso al login
    return true;
  }
};
