import { JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-cart-lists-page',
  imports: [JsonPipe],
  templateUrl: './cart-lists-page.html',
})
export class CartListsPage implements OnInit {
  protected cartService = inject(CartService);

  total = signal(0);

  constructor() {
    effect(() => {
      console.log(this.cartService.carts());
    });
  }

  ngOnInit(): void {}
}
