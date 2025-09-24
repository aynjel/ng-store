import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { TProduct } from '../../../models/products.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-product-lists-page',
  imports: [FormsModule, RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './product-lists-page.html',
})
export class ProductListsPage implements OnInit {
  private productService = inject(ProductService);

  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  protected filters = {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 9999999,
    sort: 'default',
  };

  protected products = signal<TProduct[]>([]);

  get filteredProducts() {
    let result = [...this.products()];

    // Search
    if (this.filters.search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(this.filters.search.toLowerCase())
      );
    }

    // Category
    if (this.filters.category) {
      result = result.filter((p) => p.category === this.filters.category);
    }

    // Price Range
    if (this.filters.minPrice != null) {
      result = result.filter((p) => p.price >= this.filters.minPrice);
    }
    if (this.filters.maxPrice != null) {
      result = result.filter((p) => p.price <= this.filters.maxPrice);
    }

    // Sort
    switch (this.filters.sort) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }

  ngOnInit(): void {
    this.productService
      .getAll<TProduct[]>('products')
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.products.set(response);
        },
        error: (err) => {
          this.error.set('Failed to load popular movies');
        },
      });
  }

  onAddCart() {}
}
