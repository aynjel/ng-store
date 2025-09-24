import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

type Type = 'carts' | 'products' | 'users';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(protected httpClient: HttpClient) {}

  private readonly baseUrl = environment.baseApiUrl;

  getAll<T>(type: Type): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + type);
  }
}
