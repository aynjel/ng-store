import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsFilter } from '../../../../models/products.model';

@Component({
  selector: 'app-products-filter-component',
  imports: [FormsModule],
  templateUrl: './products-filter-component.html',
})
export class ProductsFilterComponent {
  filters = model.required<ProductsFilter>();

  filterOnChange(filter: string, event: any) {
    this.filters.update((f) => ({ ...f, [filter]: event }));
  }
}
