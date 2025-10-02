import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Nav } from './layouts/nav/nav';
import { ToastComponent } from './layouts/toast/toast';
import { AuthService } from './services/auth-service';
import { CartService } from './services/cart-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ToastComponent],
  template: `
    <app-nav />
    <main class="container mx-auto mt-20">
      <router-outlet />
    </main>
    <app-toast />
  `,
})
export class App implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  private ngUnsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.cartService
        .getAll()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
