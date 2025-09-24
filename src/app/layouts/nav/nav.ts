import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth-service';
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

  onLogout(): void {
    if (this.cookieService.get('token')) {
      this.cookieService.delete('token');
      this.toastService.show('Logged out successfully', 'success');
      this.authService.isLoggedIn.set(false);
    }
  }
}
