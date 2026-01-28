import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ScopeService {

  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);
  cookieService = inject(CookieService);

  getAllCategoriesAndScopes() {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/scopes/categories`, { headers });
  }
}
