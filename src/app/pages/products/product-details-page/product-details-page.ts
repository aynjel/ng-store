import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { TProduct } from '../../../models/products.model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-product-details-page',
  imports: [],
  templateUrl: './product-details-page.html',
})
export class ProductDetailsPage implements OnInit {
  private productService = inject(ProductService);

  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  protected product = signal<TProduct | undefined>(undefined);

  ngOnInit(): void {
    this.productService
      .get('MhPKn9KcaaI1GDtI1Yfo')
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.product.set(response);
        },
        error: (err) => {
          this.error.set('Failed to load');
        },
      });
  }
}
