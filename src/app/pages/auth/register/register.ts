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
import { finalize, first } from 'rxjs';
import { CreateUserRequest } from '../../../models/users.model';
import { ToastService } from '../../../services/toast-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  protected isLoading = signal(false);

  public registerForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    const payload: CreateUserRequest = {
      email: this.registerForm.value.email!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
      name: this.registerForm.value.name!,
      active: true,
      role: 'Customer',
    };

    this.isLoading.set(true);
    this.userService
      .create<CreateUserRequest>(payload)
      .pipe(
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.toastService.show('Registration successful!', 'success');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.toastService.show(
            'Registration failed. Please try again.',
            'error'
          );
        },
      });
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
}
