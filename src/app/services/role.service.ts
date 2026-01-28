import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { CreateRoleRequest, UpdateRoleRequest } from '../features/users/models/create-role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly apiUrl = environment.apiUrl;

  http = inject(HttpClient);
  cookieService = inject(CookieService);

  saveRole(roleData: CreateRoleRequest) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/roles`, roleData, { headers });
  }

  getRoles(search?: string) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }

    return this.http.get(`${this.apiUrl}/roles`, { headers, params });
  }

  deleteRole(rolId: string) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/roles/${rolId}`, { headers });
  }

  getRoleById(rolId: string) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/roles/${rolId}`, { headers });
  }

  updateRole(roleData: UpdateRoleRequest) {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${this.apiUrl}/roles`, roleData, { headers });
  }
}
