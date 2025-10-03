import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';
import { CreateUserRequest } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fireStore: Firestore = inject(Firestore);

  public user = toSignal(authState(this.auth));

  loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async registerWithEmailAndPassword(
    payload: CreateUserRequest
  ): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      payload.email,
      payload.password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: payload.name,
    });

    const userDocRef = doc(this.fireStore, 'users', user.uid);

    const userData = {
      uid: user.uid,
      email: user.email,
      name: payload.name,
      role: payload.role,
      registrationDate: new Date(),
    };

    await setDoc(userDocRef, userData);

    return userCredential;
  }

  loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
