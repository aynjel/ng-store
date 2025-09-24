import { Routes } from '@angular/router';
import { ProductDetailsPage } from './product-details-page/product-details-page';
import { ProductListsPage } from './product-lists-page/product-lists-page';

export const routes: Routes = [
  {
    path: '',
    component: ProductListsPage,
    title: 'Products',
  },
  {
    path: ':id',
    component: ProductDetailsPage,
    title: 'Product Details',
  },
];
