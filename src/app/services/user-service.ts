import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TUser } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  create(payload: TUser): Observable<TUser> {
    return this.httpClient.post<TUser>(
      environment.baseApiUrl + 'users',
      payload
    );
  }
}
