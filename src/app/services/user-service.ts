import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
}
