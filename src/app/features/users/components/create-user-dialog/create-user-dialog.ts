import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';
import { UserService } from '../../../../services/user.service';

interface Role {
    rolId: string;
    rolName: string;
    selected: boolean;
}

export interface UserData {
    useId: string;
    useName: string;
    useCode: string;
    useLastName: string;
    useUsername: string;
    useContactNumber: string;
    roles: { rolId: string }[];
}

@Component({
    selector: 'app-create-user-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        SkeletonModule,
        PasswordModule,
        FileUploadModule
    ],
    templateUrl: './create-user-dialog.html',
    styleUrl: './create-user-dialog.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserDialog {
    visible = model<boolean>(false);
    userToEdit = input<UserData | null>(null);

    // Form fields as signals
    useName = signal('');
    useCode = signal('');
    useLastName = signal('');
    useUsername = signal('');
    usePassword = signal('');
    showPassword = signal(false);
    useContactNumber = signal('');
    avatarFile = signal<File | null>(null);
    avatarPreview = signal<string | null>(null);
    roles = signal<Role[]>([]);

    isLoadingRoles = signal(false);
    isSaving = signal(false);
    userCreated = output<void>();

    isEditMode = computed(() => this.userToEdit() !== null);
    dialogTitle = computed(() => this.isEditMode() ? 'Editar Usuario' : 'Nuevo Usuario');

    private roleService = inject(RoleService);
    private userService = inject(UserService);
    private messageService = inject(MessageService);

    canSubmit = computed(() => {
        const isPasswordValid = this.isEditMode() || this.usePassword().trim() !== '';
        const hasRoles = this.roles().some(role => role.selected);

        return this.useName().trim() !== '' &&
            this.useLastName().trim() !== '' &&
            this.useUsername().trim() !== '' &&
            this.useContactNumber().trim() !== '' &&
            isPasswordValid &&
            hasRoles;
    });

    setUsername(value: string) {
        this.useUsername.set(value.toUpperCase());
    }

    toggleRole(roleId: string) {
        this.roles.update(roles =>
            roles.map(role =>
                role.rolId === roleId
                    ? { ...role, selected: !role.selected }
                    : role
            )
        );
    }

    constructor() {
        effect(() => {
            if (this.visible()) {
                this.loadRoles();
            }
        });
    }

    private loadRoles() {
        this.isLoadingRoles.set(true);
        this.roleService.getRoles().subscribe({
            next: (resp: any) => {
                const userData = this.userToEdit();
                const selectedRoleIds = userData?.roles.map(r => r.rolId) || [];

                this.roles.set(
                    resp.data.map((role: any) => ({
                        rolId: role.rolId,
                        rolName: role.rolName,
                        selected: selectedRoleIds.includes(role.rolId)
                    }))
                );

                if (userData) {
                    this.useName.set(userData.useName);
                    this.useCode.set(userData.useCode || '');
                    this.useLastName.set(userData.useLastName);
                    this.useUsername.set(userData.useUsername);
                    this.useContactNumber.set(userData.useContactNumber);
                }

                this.isLoadingRoles.set(false);
            },
            error: () => {
                this.isLoadingRoles.set(false);
            }
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.avatarFile.set(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                this.avatarPreview.set(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    save() {
        if (this.isSaving() || !this.canSubmit()) return;

        const selectedRoles = this.roles()
            .filter(role => role.selected)
            .map(role => role.rolId);

        const formData = new FormData();
        formData.append('useName', this.useName());
        formData.append('useLastName', this.useLastName());
        formData.append('useUsername', this.useUsername());
        formData.append('useContactNumber', this.useContactNumber());
        selectedRoles.forEach(roleId => formData.append('roles', roleId));

        // Optional fields
        if (this.useCode().trim()) {
            formData.append('useCode', this.useCode());
        }

        if (!this.isEditMode() && this.usePassword().trim()) {
            formData.append('usePassword', this.usePassword());
        }

        if (this.avatarFile()) {
            formData.append('avatar', this.avatarFile()!);
        }

        this.isSaving.set(true);

        const request$ = this.isEditMode()
            ? this.userService.updateUser(this.userToEdit()!.useId, formData)
            : this.userService.createUser(formData);

        request$.subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: this.isEditMode() ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente'
                });
                this.closeAndReset();
                this.userCreated.emit();
            },
            error: (error) => {
                const messages = error.error?.message;
                const formattedMessage = Array.isArray(messages)
                    ? messages.map(msg => `- ${msg}`).join('\n')
                    : messages || `Error al ${this.isEditMode() ? 'actualizar' : 'crear'} el usuario.`;

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: formattedMessage
                });
                this.isSaving.set(false);
            }
        });
    }

    cancel() {
        this.closeAndReset();
    }

    onDialogHide() {
        this.resetForm();
    }

    private closeAndReset() {
        this.visible.set(false);
        this.resetForm();
    }

    private resetForm() {
        this.useName.set('');
        this.useCode.set('');
        this.useLastName.set('');
        this.useUsername.set('');
        this.usePassword.set('');
        this.showPassword.set(false);
        this.useContactNumber.set('');
        this.avatarFile.set(null);
        this.avatarPreview.set(null);
        this.roles.update(roles => roles.map(role => ({ ...role, selected: false })));
        this.isSaving.set(false);
    }
}
