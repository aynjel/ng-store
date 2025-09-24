import { TProduct } from './products.model';

export interface TCart {
  id: number;
  userId: number;
  products: TProduct[];
}
