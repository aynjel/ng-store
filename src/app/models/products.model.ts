export interface TProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductsFilter {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
}

export type TProductRequest = Omit<TProduct, 'id'>;
