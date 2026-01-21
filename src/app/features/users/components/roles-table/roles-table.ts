import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

interface Role {
  id: string;
  name: string;
  description: string;
  activeUsers: number;
}

@Component({
  selector: 'app-roles-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, TableModule, MenuModule],
  templateUrl: './roles-table.html',
  styleUrl: './roles-table.css'
})
export class RolesTable {
  searchQuery = signal('');
  roles = signal<Role[]>([
    { id: 'ROL-001', name: 'Administrador', description: 'Acceso total al sistema', activeUsers: 5 },
    { id: 'ROL-002', name: 'Usuario', description: 'Acceso limitado a funcionalidades básicas', activeUsers: 24 },
    { id: 'ROL-003', name: 'Auditor', description: 'Acceso de solo lectura para auditoría', activeUsers: 2 },
    { id: 'ROL-004', name: 'Soporte', description: 'Acceso a herramientas de gestión de tickets', activeUsers: 3 },
  ]);

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
    console.log('Edit role:', this.selectedRole());
  }

  deleteRole() {
    console.log('Delete role:', this.selectedRole());
  }
}
