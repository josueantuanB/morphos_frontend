import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);
  cookieService = inject(CookieService);

  createUser(formData: FormData) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/user`, formData, { headers });
  }

  updateUser(userId: string, formData: FormData) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${this.apiUrl}/user/${userId}`, formData, { headers });
  }

  getUsers(search?: string) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }

    return this.http.get(`${this.apiUrl}/user`, { headers, params });
  }
}
