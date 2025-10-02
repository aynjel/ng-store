import { Inject, inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseResourceService<T> {
  private readonly fireStore = inject(Firestore);

  private collectionRef: CollectionReference<DocumentData, DocumentData>;

  constructor(@Inject('docCollection') docCollection: string) {
    this.collectionRef = collection(this.fireStore, docCollection);
  }

  get(id: string): Observable<T | undefined> {
    const docRef = doc(this.collectionRef, id);
    const snapshot = from(getDoc(docRef));
    return snapshot.pipe(
      map((doc) =>
        doc.exists() ? ({ id: doc.id, ...doc.data() } as T) : undefined
      )
    );
  }

  getAll(): Observable<T[]> {
    const q = query(this.collectionRef);
    const snapshot = from(getDocs(q));
    return snapshot.pipe(
      map((snap) =>
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
      )
    );
  }

  create<K extends Record<string, any>>(product: K): Observable<T> {
    const docRef = from(addDoc(this.collectionRef, product));
    return docRef.pipe(map((doc) => ({ id: doc.id, ...product } as T)));
  }
}
