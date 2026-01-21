import { Component, inject, signal } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginInterface } from '../../models/login.interface';
import { LoginRootInterface } from '../../models/login.root.interface';

@Component({
  selector: 'app-auth-admin-form',
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule,
    FloatLabel
  ],
  templateUrl: './auth.admin.form.html',
  styleUrl: './auth.admin.form.css',
  providers: [ConfirmationService, MessageService],
})
export class AuthAdminForm {
  isLoading = signal(false);
  errorMessage = signal('Error al iniciar sesión');
  hasError = signal(false);
  
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['antuan_1996@hotmail.com', [Validators.required, Validators.email]],
    password: ['Antsolikkk_1222.', [Validators.required]],
  });

  login(): void {
    this.hasError.set(false);

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

     this.authService.loginRootUser(this.loginForm.value as LoginRootInterface).subscribe({
      next: (resp) => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage.set(err.error.message || 'Error al iniciar sesión');
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }

  showForgotPasswordModal(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Se enviará un correo electrónico con las instrucciones para restablecer tu contraseña',
      header: 'Recuperar contraseña',
      closable: true,
      closeOnEscape: true,
      rejectVisible: true,
      acceptVisible: false,
      dismissableMask: true,
      rejectButtonProps: {
        label: 'Cerrar',
        severity: 'contrast',
        id: 'cancel-button',
      },
    });
  }
}
