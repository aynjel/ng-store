import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TProduct } from '../../../../models/products.model';

@Component({
  selector: 'app-products-item-component',
  imports: [RouterLink, SlicePipe, CurrencyPipe],
  templateUrl: './products-item-component.html',
})
export class ProductsItemComponent {
  @Input({ required: true }) product!: TProduct;
}
