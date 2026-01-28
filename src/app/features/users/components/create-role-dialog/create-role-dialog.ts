import { Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { ScopeService } from '../../../../services/scope.service';
import { RoleService } from '../../../../services/role.service';

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

export interface RoleData {
  rolId: string;
  rolName: string;
  rolDescription: string;
  scopes: { scoId: string }[];
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
    CheckboxModule,
    SkeletonModule
  ],
  templateUrl: './create-role-dialog.html',
  styleUrl: './create-role-dialog.css'
})
export class CreateRoleDialog {
  visible = model<boolean>(false);
  roleToEdit = input<RoleData | null>(null);

  roleName = signal('');
  roleDescription = signal('');
  permissions = signal<ModulePermissions[]>([]);
  isLoadingPermissions = signal(false);
  isSaving = signal(false);
  roleCreated = output<void>();

  isEditMode = computed(() => this.roleToEdit() !== null);
  dialogTitle = computed(() => this.isEditMode() ? 'Editar Rol' : 'Nuevo Rol');

  private scopeService = inject(ScopeService);
  private roleService = inject(RoleService);
  private messageService = inject(MessageService);

  hasSelectedScopes(): boolean {
    return this.permissions().some(module =>
      module.scopes.some(scope => scope.selected)
    );
  }

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.loadPermissions();
      }
    });
  }

  private loadPermissions() {
    this.isLoadingPermissions.set(true);
    this.scopeService.getAllCategoriesAndScopes().subscribe({
      next: (resp: any) => {
        const roleData = this.roleToEdit();
        const selectedScopeIds = roleData?.scopes.map(s => s.scoId) || [];

        this.permissions.set(
          resp.data.map((category: any) => ({
            name: category.catName,
            scopes: category.scopes.map((scope: any) => ({
              id: scope.scoId,
              name: scope.scoDescription,
              code: scope.scoName,
              selected: selectedScopeIds.includes(scope.scoId)
            }))
          }))
        );

        if (roleData) {
          this.roleName.set(roleData.rolName);
          this.roleDescription.set(roleData.rolDescription);
        }

        this.isLoadingPermissions.set(false);
      },
      error: () => {
        this.isLoadingPermissions.set(false);
      }
    });
  }

  save() {
    if (this.isSaving()) return;

    const selectedScopes = this.permissions()
      .flatMap(module => module.scopes)
      .filter(scope => scope.selected)
      .map(scope => scope.id);

    this.isSaving.set(true);

    const request$ = this.isEditMode()
      ? this.roleService.updateRole({
        rolId: this.roleToEdit()!.rolId,
        rolName: this.roleName(),
        rolDescription: this.roleDescription(),
        scopes: selectedScopes
      })
      : this.roleService.saveRole({
        rolName: this.roleName(),
        rolDescription: this.roleDescription(),
        scopes: selectedScopes
      });

    request$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.isEditMode() ? 'Rol actualizado exitosamente' : 'Rol creado exitosamente'
        });
        this.closeAndReset();
        this.roleCreated.emit();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || `Error al ${this.isEditMode() ? 'actualizar' : 'crear'} el rol.`
        });
        this.isSaving.set(false);
      }
    });
  }

  cancel() {
    this.closeAndReset();
  }

  private closeAndReset() {
    this.visible.set(false);
    this.roleName.set('');
    this.roleDescription.set('');
    this.permissions().forEach(module => module.scopes.forEach(s => s.selected = false));
    this.isSaving.set(false);
  }
}
