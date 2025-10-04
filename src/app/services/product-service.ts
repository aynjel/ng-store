import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { TProduct, TProductRequest } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly fireStore = inject(Firestore);

  collectionRef = collection(this.fireStore, 'products');

  get(id: string): Observable<TProduct | undefined> {
    const docRef = doc(this.collectionRef, id);
    const snapshot = from(getDoc(docRef));
    return snapshot.pipe(
      map((doc) =>
        doc.exists() ? ({ id: doc.id, ...doc.data() } as TProduct) : undefined
      )
    );
  }

  getAll(): Observable<TProduct[]> {
    const q = query(this.collectionRef);
    const snapshot = from(getDocs(q));
    return snapshot.pipe(
      map((snap) =>
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TProduct))
      )
    );
  }

  create(product: TProductRequest): Observable<TProduct> {
    const docRef = from(addDoc(this.collectionRef, product));
    return docRef.pipe(map((doc) => ({ id: doc.id, ...product } as TProduct)));
  }

  delete(id: string): Observable<void> {
    const docRef = doc(this.collectionRef, id);
    return from(deleteDoc(docRef));
  }

  update(id: string, product: TProductRequest): Observable<TProduct> {
    const docRef = doc(this.collectionRef, id);
    return from(updateDoc(docRef, product)).pipe(
      map(() => ({ id, ...product } as TProduct))
    );
  }
}
