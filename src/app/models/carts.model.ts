export interface TCart {
  id: number;
  userId: string;
  products: TCartProducts[];
}

export interface TCartProducts {
  productId: number;
  quantity: number;
}
