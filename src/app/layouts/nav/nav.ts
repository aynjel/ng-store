import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
})
export class Nav {
  private toastService = inject(ToastService);
  private router = inject(Router);

  protected authService = inject(AuthService);
  protected cartService = inject(CartService);

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
