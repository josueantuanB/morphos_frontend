import { Component } from '@angular/core';
import { AuthForm } from "../../shared/components/auth-form/auth-form";
import { AuthFormComponent } from "../../features/auth/components/auth.form.component/auth.form.component";

@Component({
  selector: 'app-login-user',
  imports: [AuthForm, AuthFormComponent],
  templateUrl: './login-user.html',
  styleUrl: './login-user.css'
})
export class LoginUser {

}
