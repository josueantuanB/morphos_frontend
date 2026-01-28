import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../features/auth/models/login.interface';
import { LoginRootInterface } from '../features/auth/models/login.root.interface';
import { LoginResponse } from '../features/auth/models/login.response.interface';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);
  cookieService = inject(CookieService);

  login(loginData: LoginInterface) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/authentication/login-user`, loginData)
      .pipe(
        tap(resp => {
          this.cookieService.set('accessToken', resp.accessToken, 1, '/', '', false, 'Strict');
          this.cookieService.set('refreshToken', resp.refreshToken, 1, '/', '', false, 'Strict');
          // Guardar datos del usuario
          this.cookieService.set('userData', JSON.stringify(resp.data), 1, '/', '', false, 'Strict');
        })
      );
  }

  loginRootUser(loginData: LoginRootInterface) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/authentication/login`, loginData)
      .pipe(
        tap(resp => {
          this.cookieService.set('accessToken', resp.accessToken, 1, '/', '', false, 'Strict');
          this.cookieService.set('refreshToken', resp.refreshToken, 1, '/', '', false, 'Strict');
          // Guardar datos del usuario
          this.cookieService.set('userData', JSON.stringify(resp.data), 1, '/', '', false, 'Strict');
        })
      );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.cookieService.get('accessToken');
    if (!token) {
      return false;
    }

    // Verificar si el token no ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Obtener el token de acceso
  getAccessToken(): string | null {
    return this.cookieService.get('accessToken') || null;
  }

  // Obtener datos del usuario
  getUserData(): any {
    const userData = this.cookieService.get('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Obtener el nombre de usuario
  getUsername(): string {
    const userData = this.getUserData();
    return userData?.username || 'Usuario';
  }

  // Cerrar sesión
  logout(): void {
    this.cookieService.delete('accessToken', '/');
    this.cookieService.delete('refreshToken', '/');
    this.cookieService.delete('userData', '/');
  }
}
