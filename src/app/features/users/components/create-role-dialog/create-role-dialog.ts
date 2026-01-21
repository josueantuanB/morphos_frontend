import { Component, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

interface PermissionScope {
  id: string;
  name: string;
  code: string;
  selected: boolean;
}

interface ModulePermissions {
  name: string;
  scopes: PermissionScope[];
}

@Component({
  selector: 'app-create-role-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DialogModule, 
    ButtonModule, 
    InputTextModule, 
    CheckboxModule
  ],
  templateUrl: './create-role-dialog.html',
  styleUrl: './create-role-dialog.css'
})
export class CreateRoleDialog {
  visible = model<boolean>(false);
  roleName = signal('');

  permissions = signal<ModulePermissions[]>([
    {
      name: 'Usuarios',
      scopes: [
        { id: 'usr_view', name: 'Ver listado', code: 'users.read', selected: false },
        { id: 'usr_create', name: 'Crear usuario', code: 'users.create', selected: false },
        { id: 'usr_edit', name: 'Editar usuario', code: 'users.update', selected: false },
        { id: 'usr_delete', name: 'Eliminar usuario', code: 'users.delete', selected: false },
        { id: 'usr_export', name: 'Exportar data', code: 'users.export', selected: false }
      ]
    },
    {
      name: 'Roles y Permisos',
      scopes: [
        { id: 'role_view', name: 'Ver roles', code: 'roles.read', selected: false },
        { id: 'role_create', name: 'Crear rol', code: 'roles.create', selected: false },
        { id: 'role_edit', name: 'Editar rol', code: 'roles.update', selected: false },
        { id: 'role_delete', name: 'Eliminar rol', code: 'roles.delete', selected: false }
      ]
    },
    {
      name: 'Reportes',
      scopes: [
        { id: 'rep_view', name: 'Ver reportes', code: 'reports.read', selected: false },
        { id: 'rep_export', name: 'Descargar reportes', code: 'reports.export', selected: false }
      ]
    },
    {
      name: 'Estados de Cuenta',
      scopes: [
        { id: 'st_view', name: 'Ver estados', code: 'statements.read', selected: false },
        { id: 'st_hist', name: 'Ver historial', code: 'statements.history', selected: false }
      ]
    },
    {
      name: 'Formularios',
      scopes: [
        { id: 'frm_view', name: 'Ver formularios', code: 'forms.read', selected: false },
        { id: 'frm_manage', name: 'Gestionar respuestas', code: 'forms.manage', selected: false }
      ]
    },
    {
      name: 'Configuración',
      scopes: [
        { id: 'cfg_view', name: 'Ver configuración', code: 'config.read', selected: false },
        { id: 'cfg_edit', name: 'Editar configuración', code: 'config.update', selected: false }
      ]
    }
  ]);

  save() {
    console.log('Role Name:', this.roleName());
    console.log('Permissions:', this.permissions());
    this.visible.set(false);
    this.roleName.set('');
    // Reset permissions
    this.permissions().forEach(module => module.scopes.forEach(s => s.selected = false));
  }

  cancel() {
    this.visible.set(false);
  }
}
