import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

  protected authService = inject(AuthService);

  protected isLoading = signal(false);

  protected loginForm = this.formBuilder.group({
    email: new FormControl('', [
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

    this.isLoading.set(true);
    this.authService
      .loginWithEmailAndPassword(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      )
      .then((response) => {
        this.toastService.show(
          `Login successful ${response.user?.email}`,
          'success'
        );
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.toastService.show(
          `Login failed: ${err.error || err.message}`,
          'error'
        );
      })
      .finally(() => this.isLoading.set(false));
  }
}
