import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../models/login.interface';
import { LoginResponse } from '../models/login.response.interface';
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
      tap( resp => {
        this.cookieService.set('accessToken', resp.accessToken, 1, '/','',false,'Strict');
        this.cookieService.set('refreshToken', resp.refreshToken, 1, '/','',false,'Strict');
      })
    );
  }
}
