import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
})
export class Nav {
  private cookieService = inject(CookieService);
  private toastService = inject(ToastService);
  protected authService = inject(AuthService);
  protected cartService = inject(CartService);
  private router = inject(Router);

  onLogout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
    this.cookieService.delete('currentUser');
    // this.cookieService.deleteAll();
    this.toastService.show('Logged out successfully', 'success');
    this.authService.isLoggedIn.set(false);
  }

  onShopNow(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/products');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
