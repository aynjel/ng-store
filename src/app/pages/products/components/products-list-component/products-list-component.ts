import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TProduct } from '../../../../models/products.model';
import { ProductsItemComponent } from '../products-item-component/products-item-component';

@Component({
  selector: 'app-products-list-component',
  imports: [FormsModule, ProductsItemComponent],
  templateUrl: './products-list-component.html',
})
export class ProductsListComponent {
  products = input.required<TProduct[]>();
  isLoading = input.required<boolean>();
  error = input.required<string | null>();

  onAddCart() {}

  onAddProduct() {
    // const payload: TProductRequest = {
    //   title: 'New Product',
    //   description: 'This is a new product',
    //   category: 'electronics',
    //   image: 'https://i.pravatar.cc',
    //   price: 99.99,
    // };
    // this.productService.create(payload).subscribe({
    //   next: (response) => {
    //     this.products.update((products) => [...products, response]);
    //     console.log(response);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  onDeleteProduct(id: string) {
    // this.productService.delete(id).subscribe({
    //   next: () => {
    //     this.products.update((products) => products.filter((p) => p.id !== id));
    //     console.log(this.products());
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  onUpdateProduct(id: string) {
    // const payload: TProductRequest = {
    //   title: 'Updated Product',
    //   description: 'This is an updated product',
    //   category: 'electronics',
    //   image: 'https://i.pravatar.cc',
    //   price: 79.99,
    // };
    // this.productService.update(id, payload).subscribe({
    //   next: () => {
    //     this.products.update((products) =>
    //       products.map((p) => (p.id === id ? { ...p, ...payload } : p))
    //     );
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
