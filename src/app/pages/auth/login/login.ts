import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, finalize } from 'rxjs';
import { LoginRequest } from '../../../models/users.model';
import { AuthService } from '../../../services/auth-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  protected authService = inject(AuthService);
  private router = inject(Router);

  protected isLoading = signal(false);

  protected loginForm = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
  });

  protected onSubmit(): void {
    if (!this.loginForm.valid || this.isLoading()) return;

    const loginCredentials: LoginRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.authService
      .login(loginCredentials)
      .pipe(
        debounceTime(3000),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.toastService.show('Login successful', 'success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastService.show('Login failed: ' + err.error, 'error');
        },
      });
  }
}
