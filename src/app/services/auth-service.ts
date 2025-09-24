import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);

  public isLoggedIn = signal(false);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.baseApiUrl + 'auth/login', payload)
      .pipe(
        tap((response) => {
          this.cookieService.set('token', response.token);
          this.isLoggedIn.set(true);
        })
      );
  }

  retrieveUserAccount() {
    if (this.cookieService.get('token')) {
      this.isLoggedIn.set(true);
    }
  }
}
