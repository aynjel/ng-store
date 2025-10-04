import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { ToastService } from '../../services/toast-service';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, Avatar],
  templateUrl: './nav.html',
})
export class Nav implements OnInit, OnDestroy {
  private toastService = inject(ToastService);
  private router = inject(Router);

  protected authService = inject(AuthService);
  protected cartService = inject(CartService);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Close the mobile drawer when navigation completes
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const drawer = document.getElementById(
          'nav-drawer'
        ) as HTMLInputElement | null;
        if (drawer && drawer.checked) {
          drawer.checked = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogout(): void {
    this.authService.logout().then(() => {
      this.toastService.show('Logged out successfully', 'success');
    });
  }

  onShopNow(): void {
    if (this.authService.user()) {
      this.router.navigateByUrl('/products');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
