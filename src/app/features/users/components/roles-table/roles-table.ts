import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuItem } from 'primeng/api';
import { RoleService } from '../../../../services/role.service';
import { RoleData } from '../create-role-dialog/create-role-dialog';

interface Role {
  rolId: string;
  rolName: string;
  rolDescription: string;
  rolUserCount: number;
}

@Component({
  selector: 'app-roles-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, TableModule, MenuModule, SkeletonModule],
  templateUrl: './roles-table.html',
  styleUrl: './roles-table.css'
})
export class RolesTable {
  searchQuery = signal('');
  roles = signal<Role[]>([]);
  isLoading = signal(false);
  editRoleRequest = output<RoleData>();

  private roleService = inject(RoleService);
  private searchTimeout?: number;

  constructor() {
    this.loadRoles();
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.loadRoles(this.searchQuery());
    }, 300);
  }

  loadRoles(search?: string) {
    this.isLoading.set(true);
    this.roleService.getRoles(search).subscribe({
      next: (resp: any) => {
        this.roles.set(resp.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  items: MenuItem[] = [
    {
      label: 'Editar',
      command: () => this.editRole()
    },
    {
      label: 'Eliminar',
      command: () => this.deleteRole()
    }
  ];

  selectedRole = signal<Role | null>(null);

  setSelectedRole(role: Role) {
    this.selectedRole.set(role);
  }

  editRole() {
    const role = this.selectedRole();
    if (!role) return;

    this.roleService.getRoleById(role.rolId).subscribe({
      next: (resp: any) => {
        this.editRoleRequest.emit(resp.data);
      },
      error: (error) => {
        console.error('Error al obtener el rol', error);
      }
    });
  }

  deleteRole() {
    const role = this.selectedRole();
    if (!role) return;

    this.roleService.deleteRole(role.rolId).subscribe({
      next: () => {
        console.log('Rol eliminado exitosamente');
        this.roles.set(this.roles().filter(r => r.rolId !== role.rolId));
      },
      error: (error) => {
        console.error('Error al eliminar el rol', error);
      }
    });
  }
}
