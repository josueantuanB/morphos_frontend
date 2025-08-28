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
import { LoginInterface } from '../../models/login.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-form-component',
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule,
    FloatLabel
],
  templateUrl: './auth.form.component.html',
  styleUrl: './auth.form.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AuthFormComponent {
  isLoading = signal(false);
  errorMessage = signal('Error al iniciar sesión');
  hasError = signal(false);
  fb = inject(FormBuilder);
  confirmationService = inject(ConfirmationService);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    device: ['Web'],
    orgCode: ['LA_FAVORITA', [Validators.required]],
    username: ['ANTUAN_BARAHONA', [Validators.required]],
    password: ['Annssr_asd113', [Validators.required]],
  });

  login() {
    this.hasError.set(false);

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value as LoginInterface).subscribe({
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

  showModal(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Contactate con tu administrador para cambiar tu contraseña',
      header: 'Cambiar contraseña',
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
