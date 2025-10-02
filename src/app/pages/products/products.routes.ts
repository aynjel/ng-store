import { Routes } from '@angular/router';
import { ProductDetailsPage } from './product-details-page/product-details-page';
import { ProductsPage } from './products-page/products-page';

export const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    title: 'Products',
  },
  {
    path: ':id',
    component: ProductDetailsPage,
    title: 'Product Details',
  },
];
