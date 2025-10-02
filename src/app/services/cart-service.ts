import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TCart, TCartProducts } from '../models/carts.model';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly baseUrl = environment.baseApiUrl;

  carts = signal<TCartProducts[]>([]);

  getAll() {
    const userId = this.authService.getCurrentUserId();

    return this.httpClient.get<TCart[]>(this.baseUrl + 'carts').pipe(
      map((response) => {
        return response
          .filter((cart) => cart.userId === userId)
          .flatMap((item) => {
            this.carts.set(item.products);
            return item.products;
          });
      })
    );
  }
}
