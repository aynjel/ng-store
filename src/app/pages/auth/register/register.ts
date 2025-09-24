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
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { TUser } from '../../../models/users.model';
import { ToastService } from '../../../services/toast-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  protected isLoading = signal(false);

  public registerForm = this.formBuilder.group({
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

    if (
      !this.isPasswordMatch(
        this.registerForm.value.password!,
        this.registerForm.value.confirmPassword!
      )
    ) {
      return;
    }

    const payload: TUser = {
      id: parseInt(crypto.randomUUID().toString()),
      email: this.registerForm.value.email!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
    };

    this.isLoading.set(true);
    this.userService
      .create(payload)
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

  private isPasswordMatch(
    password: string,
    confirmedPassword: string
  ): boolean {
    return password === confirmedPassword;
  }
}
