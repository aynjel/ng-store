import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { ProductsItemComponent } from './products-item-component';

describe('ProductsItemComponent', () => {
  let component: ProductsItemComponent;
  let fixture: ComponentFixture<ProductsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsItemComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
