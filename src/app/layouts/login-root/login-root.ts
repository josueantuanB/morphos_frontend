import { Component } from '@angular/core';
import { AuthForm } from "../../shared/components/auth-form/auth-form";

@Component({
  selector: 'app-login-root',
  imports: [AuthForm],
  templateUrl: './login-root.html',
  styleUrl: './login-root.css'
})
export class LoginRoot {

}
