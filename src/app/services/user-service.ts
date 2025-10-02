import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TUser } from '../models/users.model';
import { FirebaseResourceService } from './firebase-resource-service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends FirebaseResourceService<TUser> {
  private httpClient = inject(HttpClient);

  constructor() {
    super('users');
  }

  // create(payload: CreateUserRequest): Observable<TUser> {
  //   const docRef = from(addDoc(this.collectionRef, payload));
  //   return docRef.pipe(map((doc) => ({ id: doc.id, ...payload } as TUser)));
  // }

  getLoggedInUser(username: string): Observable<TUser[]> {
    return this.httpClient.get<TUser[]>(environment.baseApiUrl + 'users').pipe(
      map((response) => {
        return response.filter((user) => user.username === username);
      })
    );
  }
}
