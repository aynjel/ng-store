import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateUserRequest } from '../../../models/users.model';
import { AuthService } from '../../../services/auth-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  protected isLoading = signal(false);

  public registerForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.passwordsMatchValidator(),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.passwordsMatchValidator(),
    ]),
  });

  ngOnInit(): void {
    this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    const payload: CreateUserRequest = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      role: 'Customer',
    };

    this.isLoading.set(true);
    this.authService
      .registerWithEmailAndPassword(payload)
      .then((response) => {
        this.toastService.show(
          `Registration successful: ${response.user?.email}`,
          'success'
        );
        this.router.navigate(['/auth/login']);
      })
      .catch((err) => {
        this.toastService.show(
          `Registration failed: ${err.error || err.message}`,
          'error'
        );
      })
      .finally(() => this.isLoading.set(false));
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
}
