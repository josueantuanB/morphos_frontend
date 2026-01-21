import { Component } from '@angular/core';
import { AuthForm } from "../../shared/components/auth-form/auth-form";
import { AuthAdminForm } from "../../features/auth/components/auth.admin.form/auth.admin.form";

@Component({
  selector: 'app-login-root',
  imports: [AuthForm, AuthAdminForm],
  templateUrl: './login-root.html',
  styleUrl: './login-root.css'
})
export class LoginRoot {

}
