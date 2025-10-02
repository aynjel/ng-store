import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { first, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, TUser } from '../models/users.model';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);
  private cookieService = inject(CookieService);

  public isLoggedIn = signal(false);
  public userData = signal<TUser | null>(null);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.baseApiUrl + 'auth/login', payload)
      .pipe(
        tap((response) => {
          this.cookieService.set('token', response.token);
          this.cookieService.set('username', payload.username);
          this.retrieveUserAccount();
        })
      );
  }

  retrieveUserAccount() {
    if (this.cookieService.get('token') && this.cookieService.get('username')) {
      this.isLoggedIn.set(true);
      this.userService
        .getLoggedInUser(this.cookieService.get('username'))
        .pipe(
          first(),
          tap((response) => {
            this.cookieService.set(
              'currentUser',
              btoa(JSON.stringify(response[0]))
            );
            this.userData.set(response[0]);
          })
        )
        .subscribe();
    }

    this.userData.set(null);
  }

  getCurrentUserId(): string {
    const encoded = this.cookieService.get('currentUser');
    try {
      const user = JSON.parse(atob(encoded)) as TUser;
      return user.id;
    } catch {
      throw new Error('Invalid user cookie');
    }
  }
}
