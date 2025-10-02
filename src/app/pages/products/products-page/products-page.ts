import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize, first } from 'rxjs';
import { ProductsFilter, TProduct } from '../../../models/products.model';
import { ProductService } from '../../../services/product-service';
import { ProductsFilterComponent } from '../components/products-filter-component/products-filter-component';
import { ProductsListComponent } from '../components/products-list-component/products-list-component';

@Component({
  selector: 'app-products-page',
  imports: [ProductsListComponent, ProductsFilterComponent],
  templateUrl: './products-page.html',
})
export class ProductsPage implements OnInit {
  private productService = inject(ProductService);

  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);
  protected products = signal<TProduct[]>([]);

  protected filters = signal<ProductsFilter>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 9999999,
    sort: 'default',
  });

  protected readonly filteredProducts = computed(() => {
    let result = [...this.products()];

    // Search
    if (this.filters().search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(this.filters().search.toLowerCase())
      );
    }

    // Category
    if (this.filters().category) {
      result = result.filter((p) => p.category === this.filters().category);
    }

    // Price Range
    if (this.filters().minPrice != null) {
      result = result.filter((p) => p.price >= this.filters().minPrice);
    }
    if (this.filters().maxPrice != null) {
      result = result.filter((p) => p.price <= this.filters().maxPrice);
    }

    // Sort
    switch (this.filters().sort) {
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
  });

  ngOnInit(): void {
    this.productService
      .getAll()
      .pipe(
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.products.set(response);
        },
        error: (err) => {
          this.error.set('Failed to load products');
          console.error(err);
        },
      });
  }
}
